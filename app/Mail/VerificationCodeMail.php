<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

class VerificationCodeMail extends Mailable
{
    use Queueable;

    public function __construct(
        public string $code,
        public string $name
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Togg Charge Tracker - E-posta Doğrulama Kodu',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.verification-code',
            with: [
                'code' => $this->code,
                'name' => $this->name,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
