<?php

namespace App\Services\AiProviders;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OpenAiProvider implements AiProviderInterface
{
    private string $apiKey;
    private string $model;

    public function __construct()
    {
        $this->apiKey = env('OPENAI_API_KEY', '');
        $this->model = env('OPENAI_MODEL', 'gpt-4o');
    }

    public function getName(): string
    {
        return 'openai';
    }

    public function getDefaultPrompt(): string
    {
        return <<<'EOT'
Bu bir elektrikli araç şarj fişi görselidir. Lütfen aşağıdaki bilgileri çıkar ve SADECE JSON formatında döndür:

{
  "date": "YYYY-MM-DD formatında tarih",
  "company": "Şarj istasyonu şirketi (ZES, Eşarj, Trugo, Sharz, Voltrun, Astor, PowerSharz veya yazılan)",
  "kwh": "sayı olarak enerji miktarı (sadece rakam)",
  "amount": "sayı olarak tutar (sadece rakam)",
  "charge_type": "AC veya DC",
  "charge_percentage": "şarj yüzdesi sayı olarak (varsa)"
}

Kurallar:
- Tarih yoksa date: null
- Şirket adı tam olarak göründüğü gibi olmalı
- kWh ve amount sadece sayı olmalı (birim yok)
- charge_type sadece "AC" veya "DC" olmalı
- charge_percentage yoksa null
- JSON dışında hiçbir açıklama yapma
EOT;
    }

    public function parseReceipt(string $base64Image, string $prompt): array
    {
        if (!$this->apiKey) {
            Log::error('OpenAI: API anahtarı yapılandırılmamış');
            return [
                'success' => false,
                'error' => 'AI servisi yapılandırılmamış',
            ];
        }

        try {
            $url = 'https://api.openai.com/v1/chat/completions';
            Log::debug('OpenAI: API çağrısı başlatılıyor', ['model' => $this->model]);

            $payload = $this->buildPayload($prompt, $base64Image);
            $response = Http::timeout(30)
                ->withHeaders([
                    'Authorization' => 'Bearer ' . $this->apiKey,
                    'Content-Type' => 'application/json',
                ])
                ->post($url, $payload);

            if (!$response->successful()) {
                Log::error('OpenAI: API yanıt vermedi', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
                return [
                    'success' => false,
                    'error' => 'AI servisi yanıt vermedi: ' . $response->status(),
                ];
            }

            $result = $response->json();
            Log::debug('OpenAI: API yanıtı alındı');

            return $this->parseResponse($result);

        } catch (\Exception $e) {
            Log::error('OpenAI: Fiş okunamadı', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return [
                'success' => false,
                'error' => 'Fiş okunamadı: ' . $e->getMessage(),
            ];
        }
    }

    private function buildPayload(string $prompt, string $base64Image): array
    {
        return [
            'model' => $this->model,
            'messages' => [
                [
                    'role' => 'user',
                    'content' => [
                        ['type' => 'text', 'text' => $prompt],
                        [
                            'type' => 'image_url',
                            'image_url' => [
                                'url' => 'data:image/jpeg;base64,' . $base64Image,
                            ]
                        ]
                    ]
                ]
            ],
            'temperature' => 0.1,
            'max_tokens' => 500,
        ];
    }

    private function parseResponse(array $response): array
    {
        try {
            $text = $response['choices'][0]['message']['content'] ?? '';
            Log::debug('OpenAI: Yanıt metni alındı', ['text_length' => strlen($text)]);

            // Markdown code block içindeki JSON'ı bul
            if (preg_match('/```(?:json)?\s*(\{.*?\})\s*```/s', $text, $matches)) {
                $jsonText = $matches[1];
            } elseif (preg_match('/{[^{}]*\}/s', $text, $matches)) {
                $jsonText = $matches[0];
            } else {
                $jsonText = $text;
            }

            $data = json_decode($jsonText, true);

            if (json_last_error() === JSON_ERROR_NONE) {
                Log::info('OpenAI: JSON başarıyla ayrıştırıldı', ['data' => $data]);
                return [
                    'success' => true,
                    'data' => [
                        'date' => $data['date'] ?? null,
                        'company' => $data['company'] ?? null,
                        'kwh' => $this->parseFloat($data['kwh'] ?? null),
                        'amount' => $this->parseFloat($data['amount'] ?? null),
                        'charge_type' => !empty($data['charge_type']) ? strtoupper($data['charge_type']) : null,
                        'charge_percentage' => $this->parseInt($data['charge_percentage'] ?? null),
                    ],
                ];
            } else {
                Log::error('OpenAI: JSON ayrıştırma hatası', ['json_error' => json_last_error_msg()]);
            }

            return [
                'success' => false,
                'error' => 'Fiş bilgileri ayrıştırılamadı',
            ];

        } catch (\Exception $e) {
            Log::error('OpenAI: Yanıt işlenemedi', ['message' => $e->getMessage()]);
            return [
                'success' => false,
                'error' => 'AI yanıt işlenemedi',
            ];
        }
    }

    private function parseFloat($value): ?float
    {
        if ($value === null || $value === '') return null;
        $value = str_replace(',', '.', $value);
        $parsed = floatval($value);
        return $parsed > 0 ? $parsed : null;
    }

    private function parseInt($value): ?int
    {
        if ($value === null || $value === '') return null;
        $parsed = intval($value);
        return ($parsed >= 0 && $parsed <= 100) ? $parsed : null;
    }
}
