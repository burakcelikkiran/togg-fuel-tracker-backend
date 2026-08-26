import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { formatDateDisplay } from '@/lib/date-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Pencil, Trash2 } from 'lucide-react';
import { Charge, PageProps, Vehicle } from '@/types';

interface ChargeIndexProps extends PageProps {
    charges: Charge[];
    companies: string[];
    filters: {
        company?: string;
        start_date?: string;
        end_date?: string;
    };
    vehicles: Vehicle[];
    activeVehicle: Vehicle | null;
}

export default function Index({
    charges,
    companies,
    filters,
    activeVehicle,
}: ChargeIndexProps) {
    const [filterCompany, setFilterCompany] = useState(filters.company || '');
    const [startDate, setStartDate] = useState(filters.start_date || '');
    const [endDate, setEndDate] = useState(filters.end_date || '');
    const [editCharge, setEditCharge] = useState<Charge | null>(null);

    const editForm = useForm({
        date: '',
        company: '',
        kwh: '',
        amount: '',
    });

    editForm.transform((data) => ({
        ...data,
        kwh: parseFloat(data.kwh),
        amount: parseFloat(data.amount),
    }));

    const handleFilter = () => {
        router.get('/charges', {
            company: filterCompany && filterCompany !== 'all' ? filterCompany : undefined,
            start_date: startDate || undefined,
            end_date: endDate || undefined,
        }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (!confirm('Bu kaydı silmek istediğinize emin misiniz?')) return;
        router.delete(`/charges/${id}`, { preserveScroll: true });
    };

    const openEdit = (charge: Charge) => {
        setEditCharge(charge);
        editForm.setData({
            date: charge.date,
            company: charge.company,
            kwh: charge.kwh.toString(),
            amount: charge.amount.toString(),
        });
    };

    const handleUpdate = () => {
        if (!editCharge) return;
        editForm.put(`/charges/${editCharge.id}`, {
            onSuccess: () => setEditCharge(null),
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Şarj Geçmişi" />
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">Şarj Geçmişi</h1>
                    {activeVehicle && <p className="text-muted-foreground">{activeVehicle.name}</p>}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Filtreler</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap items-end gap-4">
                            <div className="space-y-1">
                                <Label className="text-xs">Firma</Label>
                                <Select value={filterCompany} onValueChange={setFilterCompany}>
                                    <SelectTrigger className="w-40">
                                        <SelectValue placeholder="Tümü" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tümü</SelectItem>
                                        {companies.map((company) => (
                                            <SelectItem key={company} value={company}>
                                                {company}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs">Başlangıç</Label>
                                <Input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-40"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs">Bitiş</Label>
                                <Input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-40"
                                />
                            </div>
                            <Button onClick={handleFilter} size="sm">
                                Filtrele
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        {charges.length === 0 ? (
                            <p className="py-10 text-center text-muted-foreground">Henüz kayıt bulunmuyor.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-border text-left text-muted-foreground">
                                            <th className="pb-2 pr-3">Tarih</th>
                                            <th className="pb-2 pr-3">Firma</th>
                                            <th className="pb-2 pr-3 text-right">kWh</th>
                                            <th className="pb-2 pr-3 text-right">Tutar</th>
                                            <th className="pb-2 pr-3 text-right">₺/kWh</th>
                                            <th className="pb-2 pr-3 text-right">%</th>
                                            <th className="pb-2 text-right">İşlem</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {charges.map((charge) => (
                                            <tr key={charge.id} className="border-b border-border/50">
                                                <td className="py-2 pr-3">{formatDateDisplay(charge.date)}</td>
                                                <td className="py-2 pr-3">{charge.company}</td>
                                                <td className="py-2 pr-3 text-right">{charge.kwh}</td>
                                                <td className="py-2 pr-3 text-right">₺{charge.amount.toFixed(2)}</td>
                                                <td className="py-2 pr-3 text-right">{charge.unit_price.toFixed(2)}</td>
                                                <td className="py-2 pr-3 text-right">{charge.charge_percentage ?? '-'}</td>
                                                <td className="py-2 text-right">
                                                    <div className="flex justify-end gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-7 w-7"
                                                            onClick={() => openEdit(charge)}
                                                        >
                                                            <Pencil className="h-3.5 w-3.5" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-7 w-7 text-destructive"
                                                            onClick={() => handleDelete(charge.id)}
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Dialog open={!!editCharge} onOpenChange={(open) => !open && setEditCharge(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Kaydı Düzenle</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <Label>Tarih</Label>
                                <Input
                                    type="date"
                                    value={editForm.data.date}
                                    onChange={(e) => editForm.setData('date', e.target.value)}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label>Firma</Label>
                                <Input
                                    value={editForm.data.company}
                                    onChange={(e) => editForm.setData('company', e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label>kWh</Label>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        value={editForm.data.kwh}
                                        onChange={(e) => editForm.setData('kwh', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label>Tutar (₺)</Label>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        value={editForm.data.amount}
                                        onChange={(e) => editForm.setData('amount', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setEditCharge(null)}>
                                İptal
                            </Button>
                            <Button onClick={handleUpdate} disabled={editForm.processing}>
                                {editForm.processing ? 'Kaydediliyor...' : 'Güncelle'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
