<?php

namespace App\Services\AiProviders;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiProvider implements AiProviderInterface
{
    private string $apiKey;
    private string $model;

    public function __construct()
    {
        $this->apiKey = env('GEMINI_API_KEY', '');
        $this->model = env('GEMINI_MODEL', 'gemini-1.5-flash');
    }

    public function getName(): string
    {
        return 'gemini';
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
            Log::error('Gemini: API anahtarı yapılandırılmamış');
            return [
                'success' => false,
                'error' => 'AI servisi yapılandırılmamış',
            ];
        }

        try {
            $url = $this->buildUrl();
            Log::debug('Gemini: API çağrısı başlatılıyor', ['model' => $this->model]);

            $payload = $this->buildPayload($prompt, $base64Image);
            $response = Http::timeout(30)->post($url, $payload);

            if (!$response->successful()) {
                Log::error('Gemini: API yanıt vermedi', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
                return [
                    'success' => false,
                    'error' => 'AI servisi yanıt vermedi: ' . $response->status(),
                ];
            }

            $result = $response->json();
            Log::debug('Gemini: API yanıtı alındı');

            return $this->parseResponse($result);

        } catch (\Exception $e) {
            Log::error('Gemini: Fiş okunamadı', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return [
                'success' => false,
                'error' => 'Fiş okunamadı: ' . $e->getMessage(),
            ];
        }
    }

    private function buildUrl(): string
    {
        return "https://generativelanguage.googleapis.com/v1beta/models/{$this->model}:generateContent?key={$this->apiKey}";
    }

    private function buildPayload(string $prompt, string $base64Image): array
    {
        return [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $prompt],
                        [
                            'inline_data' => [
                                'mime_type' => 'image/jpeg',
                                'data' => $base64Image,
                            ]
                        ]
                    ]
                ]
            ],
            'generationConfig' => [
                'temperature' => 0.1,
                'maxOutputTokens' => 500,
            ]
        ];
    }

    private function parseResponse(array $response): array
    {
        try {
            $text = $response['candidates'][0]['content']['parts'][0]['text'] ?? '';
            Log::debug('Gemini: Yanıt metni alındı', ['text_length' => strlen($text)]);

            if (preg_match('/{[^{}]*\}/s', $text, $matches)) {
                $data = json_decode($matches[0], true);

                if (json_last_error() === JSON_ERROR_NONE) {
                    Log::info('Gemini: JSON başarıyla ayrıştırıldı', ['data' => $data]);
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
                    Log::error('Gemini: JSON ayrıştırma hatası', ['json_error' => json_last_error_msg()]);
                }
            } else {
                Log::warning('Gemini: JSON bloğu bulunamadı', ['raw_text' => substr($text, 0, 200)]);
            }

            return [
                'success' => false,
                'error' => 'Fiş bilgileri ayrıştırılamadı',
            ];

        } catch (\Exception $e) {
            Log::error('Gemini: Yanıt işlenemedi', ['message' => $e->getMessage()]);
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
