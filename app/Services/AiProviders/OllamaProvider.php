<?php

namespace App\Services\AiProviders;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OllamaProvider implements AiProviderInterface
{
    private string $baseUrl;
    private string $model;
    private string $apiKey;

    public function __construct()
    {
        $this->baseUrl = env('OLLAMA_BASE_URL', 'http://localhost:11434');
        $this->model = env('OLLAMA_MODEL', 'llava');
        $this->apiKey = env('OLLAMA_API_KEY', '');
    }

    public function getName(): string
    {
        return 'ollama';
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
        try {
            // URL zaten /api/chat içeriyorsa kullan, yoksa ekle
            $url = str_ends_with($this->baseUrl, '/api/chat')
                ? $this->baseUrl
                : (str_ends_with($this->baseUrl, '/api/generate')
                    ? $this->baseUrl // Yerel Ollama için
                    : rtrim($this->baseUrl, '/') . '/api/chat');

            Log::debug('Ollama: API çağrısı başlatılıyor', ['model' => $this->model, 'url' => $url]);

            $payload = $this->buildPayload($prompt, $base64Image);
            $headers = [
                'Content-Type' => 'application/json',
            ];

            if ($this->apiKey) {
                $headers['Authorization'] = 'Bearer ' . $this->apiKey;
            }

            $response = Http::timeout(120)
                ->withHeaders($headers)
                ->post($url, $payload);

            if (!$response->successful()) {
                Log::error('Ollama: API yanıt vermedi', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
                return [
                    'success' => false,
                    'error' => 'AI servisi yanıt vermedi: ' . $response->status(),
                ];
            }

            $result = $response->json();
            Log::debug('Ollama: API yanıtı alındı');

            return $this->parseResponse($result);

        } catch (\Exception $e) {
            Log::error('Ollama: Fiş okunamadı', [
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
        // Ollama Cloud API formatı (/api/chat endpoint)
        // Format: { model, messages: [{ role, content, images }], stream }
        if (str_contains($this->baseUrl, 'ollama.com') || $this->apiKey) {
            return [
                'model' => $this->model,
                'messages' => [
                    [
                        'role' => 'user',
                        'content' => $prompt,
                        'images' => [$base64Image],
                    ]
                ],
                'stream' => false,
            ];
        }

        // Yerel Ollama formatı (/api/generate endpoint)
        return [
            'model' => $this->model,
            'prompt' => $prompt,
            'images' => [$base64Image],
            'stream' => false,
            'options' => [
                'temperature' => 0.1,
                'num_predict' => 500,
            ]
        ];
    }

    private function parseResponse(array $response): array
    {
        try {
            // Ollama Cloud formatı (message.content)
            if (isset($response['message']['content'])) {
                $text = $response['message']['content'];
            }
            // OpenAI uyumlu format (choices.message.content)
            elseif (isset($response['choices'][0]['message']['content'])) {
                $text = $response['choices'][0]['message']['content'];
            }
            // Yerel Ollama formatı (response)
            elseif (isset($response['response'])) {
                $text = $response['response'];
            } else {
                $text = '';
            }

            Log::debug('Ollama: Yanıt metni alındı', ['text_length' => strlen($text)]);

            // JSON bloğunu bul
            if (preg_match('/```(?:json)?\s*(\{.*?\})\s*```/s', $text, $matches)) {
                $jsonText = $matches[1];
            } elseif (preg_match('/{[^{}]*\}/s', $text, $matches)) {
                $jsonText = $matches[0];
            } else {
                $jsonText = $text;
            }

            $data = json_decode($jsonText, true);

            if (json_last_error() === JSON_ERROR_NONE) {
                Log::info('Ollama: JSON başarıyla ayrıştırıldı', ['data' => $data]);
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
                Log::error('Ollama: JSON ayrıştırma hatası', ['json_error' => json_last_error_msg()]);
            }

            return [
                'success' => false,
                'error' => 'Fiş bilgileri ayrıştırılamadı',
            ];

        } catch (\Exception $e) {
            Log::error('Ollama: Yanıt işlenemedi', ['message' => $e->getMessage()]);
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
