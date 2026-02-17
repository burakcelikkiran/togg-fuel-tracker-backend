<?php

namespace App\Services\AiProviders;

interface AiProviderInterface
{
    /**
     * Görseli analiz ederek fiş bilgilerini döndürür
     */
    public function parseReceipt(string $base64Image, string $prompt): array;

    /**
     * Provider için varsayılan prompt'u döndürür
     */
    public function getDefaultPrompt(): string;

    /**
     * Provider adını döndürür
     */
    public function getName(): string;
}
