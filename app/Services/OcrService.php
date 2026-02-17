<?php

namespace App\Services;

use App\Services\AiProviders\AiProviderInterface;
use App\Services\AiProviders\GeminiProvider;
use App\Services\AiProviders\OllamaProvider;
use App\Services\AiProviders\OpenAiProvider;
use App\Services\AiProviders\ZAiProvider;
use Illuminate\Support\Facades\Log;

class OcrService
{
    private AiProviderInterface $provider;

    public function __construct()
    {
        $this->provider = $this->resolveProvider();
    }

    /**
     * Şarj fişi görselini parse eder
     */
    public function parseChargeReceipt($imagePath): array
    {
        Log::info('OCR: Fiş parse işlemi başlatıldı', [
            'provider' => $this->provider->getName(),
            'image_path' => $imagePath,
        ]);

        try {
            // Görseli base64'e çevir
            Log::debug('OCR: Görsel hazırlanıyor');
            $imageData = $this->prepareImage($imagePath);
            Log::debug('OCR: Görsel başarıyla hazırlandı', ['size_bytes' => strlen($imageData)]);

            // Provider'ın varsayılan prompt'unu kullan
            $prompt = $this->provider->getDefaultPrompt();

            // Provider ile fişi parse et
            $result = $this->provider->parseReceipt($imageData, $prompt);

            Log::info('OCR: Fiş parse işlemi tamamlandı', [
                'success' => $result['success'],
                'data' => $result['success'] ? $result['data'] : null,
            ]);

            return $result;

        } catch (\Exception $e) {
            Log::error('OCR: Fiş okunamadı', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return [
                'success' => false,
                'error' => 'Fiş okunamadı: ' . $e->getMessage(),
            ];
        }
    }

    /**
     * Aktif provider'ı çözüler
     */
    private function resolveProvider(): AiProviderInterface
    {
        $provider = env('AI_PROVIDER', 'gemini');

        return match ($provider) {
            'openai' => new OpenAiProvider(),
            'zai' => new ZAiProvider(),
            'ollama' => new OllamaProvider(),
            default => new GeminiProvider(),
        };
    }

    /**
     * Aktif provider adını döndürür
     */
    public function getProviderName(): string
    {
        return $this->provider->getName();
    }

    /**
     * Görseli base64 formatına hazırlar
     */
    private function prepareImage($image): string
    {
        // Eğer uploaded file ise
        if (is_string($image) && str_starts_with($image, 'data:image')) {
            Log::debug('OCR: Base64 data URL formatında');
            // Base64 data URL
            return substr($image, strpos($image, ',') + 1);
        }

        // Dosya yolu ise
        if (is_string($image) && file_exists($image)) {
            Log::debug('OCR: Dosya yolundan okunuyor', ['path' => $image]);
            return base64_encode(file_get_contents($image));
        }

        // Uploaded File objesi
        if (method_exists($image, 'get')) {
            Log::debug('OCR: Uploaded File objesinden okunuyor');
            return base64_encode($image->get());
        }

        Log::error('OCR: Geçersiz görsel formatı', ['image_type' => gettype($image)]);
        throw new \Exception('Geçersiz görsel formatı');
    }
}
