import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, ArrowLeft } from 'lucide-react';
import { PageProps } from '@/types';

interface VerifyEmailProps extends PageProps {
    customerId: number;
}

export default function VerifyEmail({ customerId }: VerifyEmailProps) {
    const { data, setData, post, processing, errors } = useForm({
        customer_id: customerId,
        code: '',
    });

    const resendForm = useForm({
        customer_id: customerId,
    });

    const [timeLeft, setTimeLeft] = useState(0);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/verify');
    };

    const handleResend = () => {
        if (timeLeft > 0) return;

        resendForm.post('/resend-code', {
            onSuccess: () => {
                setTimeLeft(60);
                const timer = setInterval(() => {
                    setTimeLeft((prev) => {
                        if (prev <= 1) {
                            clearInterval(timer);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            },
        });
    };

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
        setData('code', value);
    };

    return (
        <>
            <Head title="E-posta Doğrulama" />
            <div className="flex min-h-screen items-center justify-center bg-background p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                            <Mail className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">E-posta Doğrulama</CardTitle>
                        <CardDescription>
                            E-posta adresinize gönderilen 6 haneli kodu girin
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="code" className="text-center">
                                    Doğrulama Kodu
                                </Label>
                                <Input
                                    id="code"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={6}
                                    value={data.code}
                                    onChange={handleCodeChange}
                                    placeholder="------"
                                    className="text-center text-2xl tracking-widest"
                                    required
                                    autoFocus
                                />
                                {errors.code && <p className="text-center text-sm text-destructive">{errors.code}</p>}
                                <p className="text-center text-sm text-muted-foreground">
                                    Kodu 15 dakika içinde girin
                                </p>
                            </div>

                            <Button type="submit" className="w-full" disabled={processing || data.code.length !== 6}>
                                {processing ? 'Doğrulanıyor...' : 'Doğrula'}
                            </Button>

                            <div className="flex flex-col gap-3">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="w-full"
                                    onClick={handleResend}
                                    disabled={resendForm.processing || timeLeft > 0}
                                >
                                    {resendForm.processing
                                        ? 'Gönderiliyor...'
                                        : timeLeft > 0
                                          ? `Yeni kod (${timeLeft}s)`
                                          : 'Yeni kod gönder'}
                                </Button>

                                <Button type="button" variant="ghost" className="w-full" asChild>
                                    <Link href="/register">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Geri dön
                                    </Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
