import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, ZapOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageProps, Vehicle } from '@/types';

interface CreateChargeProps extends PageProps {
    companies: string[];
    vehicles: Vehicle[];
    activeVehicle: Vehicle | null;
}

export default function Create({ companies, activeVehicle }: CreateChargeProps) {
    const [isOtherCompany, setIsOtherCompany] = useState(false);
    const [customCompanyName, setCustomCompanyName] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const form = useForm({
        date: new Date().toISOString().split('T')[0],
        company: '',
        charge_type: 'AC' as 'AC' | 'DC',
        charge_percentage: '',
        kwh: '',
        amount: '',
    });

    form.transform((data) => ({
        date: data.date,
        company: isOtherCompany ? customCompanyName : data.company,
        charge_type: data.charge_type,
        charge_percentage: data.charge_percentage ? parseInt(data.charge_percentage, 10) : null,
        kwh: parseFloat(data.kwh),
        amount: parseFloat(data.amount),
    }));

    const { data, setData, post, processing, errors } = form;

    const unitPrice =
        data.kwh && data.amount
            ? (parseFloat(data.amount) / parseFloat(data.kwh)).toFixed(2)
            : '—';

    const filteredCompanies = [
        ...companies.filter((c) => c.toLowerCase().includes(data.company.toLowerCase())),
        ...(data.company.toLowerCase().includes('diğer') ? [] : ['Diğer']),
    ];

    const handleCompanySelect = (company: string) => {
        if (company === 'Diğer') {
            setIsOtherCompany(true);
            setData('company', 'Diğer');
        } else {
            setIsOtherCompany(false);
            setData('company', company);
        }
        setShowSuggestions(false);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/charges');
    };

    return (
        <AppLayout>
            <Head title="Yeni Şarj Kaydı" />
            <div className="mx-auto max-w-lg space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">Yeni Şarj Kaydı</h1>
                    {activeVehicle && <p className="text-muted-foreground">{activeVehicle.name}</p>}
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Şarj Bilgileri</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Tarih</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
                                    required
                                />
                                {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Şarj Tipi</Label>
                                <div className="grid grid-cols-2 gap-3">
                                    {(['AC', 'DC'] as const).map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setData('charge_type', type)}
                                            className={cn(
                                                'flex flex-col items-center gap-1.5 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all',
                                                data.charge_type === type
                                                    ? 'border-primary bg-primary/10 text-primary shadow-sm'
                                                    : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-accent/50',
                                            )}
                                        >
                                            {type === 'AC' ? (
                                                <Zap className="h-5 w-5" />
                                            ) : (
                                                <ZapOff className="h-5 w-5" />
                                            )}
                                            <span>{type} Şarj</span>
                                            <span className="text-xs font-normal opacity-70">
                                                {type === 'AC' ? 'Normal' : 'Hızlı'}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="relative space-y-2">
                                <Label htmlFor="company">Şarj Firması</Label>
                                <Input
                                    id="company"
                                    value={data.company}
                                    onChange={(e) => {
                                        setData('company', e.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                    required
                                    placeholder="ZES, Eşarj, Trugo..."
                                />
                                {errors.company && <p className="text-sm text-destructive">{errors.company}</p>}
                                {showSuggestions && filteredCompanies.length > 0 && (
                                    <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-md border border-border bg-popover shadow-lg">
                                        {filteredCompanies.map((company) => (
                                            <button
                                                key={company}
                                                type="button"
                                                className="block w-full px-3 py-2 text-left text-sm hover:bg-accent"
                                                onClick={() => handleCompanySelect(company)}
                                            >
                                                {company}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {isOtherCompany && (
                                <div className="space-y-2">
                                    <Label htmlFor="custom-company">Firma Adı</Label>
                                    <Input
                                        id="custom-company"
                                        value={customCompanyName}
                                        onChange={(e) => setCustomCompanyName(e.target.value)}
                                        placeholder="Firma adını girin..."
                                        required
                                    />
                                </div>
                            )}

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="kwh">Enerji (kWh)</Label>
                                    <Input
                                        id="kwh"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.kwh}
                                        onChange={(e) => setData('kwh', e.target.value)}
                                        required
                                        placeholder="45.2"
                                    />
                                    {errors.kwh && <p className="text-sm text-destructive">{errors.kwh}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="amount">Tutar (₺)</Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.amount}
                                        onChange={(e) => setData('amount', e.target.value)}
                                        required
                                        placeholder="150.00"
                                    />
                                    {errors.amount && <p className="text-sm text-destructive">{errors.amount}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="percentage">Şarj Yüzdesi (%)</Label>
                                    <Input
                                        id="percentage"
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={data.charge_percentage}
                                        onChange={(e) => setData('charge_percentage', e.target.value)}
                                        placeholder="80"
                                    />
                                </div>
                            </div>

                            <div className="rounded-lg bg-accent/50 px-4 py-3">
                                <span className="text-sm text-muted-foreground">Birim Fiyat: </span>
                                <span className="font-semibold text-primary">{unitPrice} ₺/kWh</span>
                            </div>

                            <Button type="submit" className="w-full" disabled={processing}>
                                {processing ? 'Kaydediliyor...' : 'Kaydet'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
