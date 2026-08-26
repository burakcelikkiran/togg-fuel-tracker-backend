import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
    AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Plus, CheckCircle, Car as CarIcon } from 'lucide-react';
import { PageProps, Vehicle, VehicleFormData } from '@/types';

interface VehiclesIndexProps extends PageProps {
    vehicles: Vehicle[];
    activeVehicle: Vehicle | null;
}

const emptyForm: VehicleFormData = {
    name: '',
    brand: '',
    model: '',
    plate: '',
    battery_capacity: undefined,
    year: undefined,
    kilometer: undefined,
};

export default function Index({ vehicles }: VehiclesIndexProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);

    const form = useForm<VehicleFormData>(emptyForm);

    const resetForm = () => {
        form.reset();
        form.clearErrors();
        setEditingVehicle(null);
    };

    const openAddDialog = () => {
        resetForm();
        setDialogOpen(true);
    };

    const openEditDialog = (vehicle: Vehicle) => {
        setEditingVehicle(vehicle);
        form.setData({
            name: vehicle.name,
            brand: vehicle.brand || '',
            model: vehicle.model || '',
            plate: vehicle.plate || '',
            battery_capacity: vehicle.battery_capacity || undefined,
            year: vehicle.year || undefined,
            kilometer: vehicle.kilometer || undefined,
        });
        setDialogOpen(true);
    };

    const openDeleteDialog = (vehicle: Vehicle) => {
        setVehicleToDelete(vehicle);
        setDeleteDialogOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.data.name.trim()) return;

        if (editingVehicle) {
            form.put(`/vehicles/${editingVehicle.id}`, {
                onSuccess: () => {
                    setDialogOpen(false);
                    resetForm();
                },
                preserveScroll: true,
            });
        } else {
            form.post('/vehicles', {
                onSuccess: () => {
                    setDialogOpen(false);
                    resetForm();
                },
                preserveScroll: true,
            });
        }
    };

    const handleDelete = () => {
        if (!vehicleToDelete) return;
        router.delete(`/vehicles/${vehicleToDelete.id}`, {
            onSuccess: () => {
                setDeleteDialogOpen(false);
                setVehicleToDelete(null);
            },
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Araçlarım" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Araçlarım</h1>
                        <p className="text-muted-foreground">Araçlarınızı yönetin ve aktif aracı seçin</p>
                    </div>
                    <Button onClick={openAddDialog}>
                        <Plus className="mr-2 h-4 w-4" />
                        Yeni Araç
                    </Button>
                </div>

                {vehicles.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <CarIcon className="mb-4 h-12 w-12 text-muted-foreground" />
                            <h3 className="mb-2 text-lg font-semibold">Henüz aracınız yok</h3>
                            <p className="mb-4 text-center text-muted-foreground">
                                İlk aracınızı ekleyerek şarj takibine başlayın.
                            </p>
                            <Button onClick={openAddDialog}>
                                <Plus className="mr-2 h-4 w-4" />
                                İlk Aracı Ekle
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Kayıtlı Araçlar ({vehicles.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Araç Adı</TableHead>
                                            <TableHead>Marka / Model</TableHead>
                                            <TableHead>Plaka</TableHead>
                                            <TableHead>Pil (kWh)</TableHead>
                                            <TableHead>Yıl</TableHead>
                                            <TableHead>Kilometre</TableHead>
                                            <TableHead>Durum</TableHead>
                                            <TableHead className="text-right">İşlemler</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {vehicles.map((vehicle) => (
                                            <TableRow key={vehicle.id}>
                                                <TableCell className="font-medium">{vehicle.name}</TableCell>
                                                <TableCell>
                                                    {vehicle.brand && vehicle.model
                                                        ? `${vehicle.brand} ${vehicle.model}`
                                                        : vehicle.brand || vehicle.model || '-'}
                                                </TableCell>
                                                <TableCell>{vehicle.plate || '-'}</TableCell>
                                                <TableCell>
                                                    {vehicle.battery_capacity
                                                        ? `${vehicle.battery_capacity} kWh`
                                                        : '-'}
                                                </TableCell>
                                                <TableCell>{vehicle.year || '-'}</TableCell>
                                                <TableCell>
                                                    {vehicle.kilometer
                                                        ? `${vehicle.kilometer.toLocaleString('tr-TR')} km`
                                                        : '-'}
                                                </TableCell>
                                                <TableCell>
                                                    {vehicle.is_active ? (
                                                        <Badge variant="default" className="gap-1">
                                                            <CheckCircle className="h-3 w-3" />
                                                            Aktif
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="outline">Pasif</Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => openEditDialog(vehicle)}
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => openDeleteDialog(vehicle)}
                                                            disabled={vehicles.length === 1 && vehicle.is_active}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingVehicle ? 'Araç Düzenle' : 'Yeni Araç Ekle'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Araç Adı *</Label>
                                    <Input
                                        id="name"
                                        value={form.data.name}
                                        onChange={(e) => form.setData('name', e.target.value)}
                                        placeholder="Örn: T10 Togg"
                                        required
                                    />
                                    {form.errors.name && (
                                        <p className="text-sm text-destructive">{form.errors.name}</p>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="brand">Marka</Label>
                                        <Input
                                            id="brand"
                                            value={form.data.brand || ''}
                                            onChange={(e) => form.setData('brand', e.target.value)}
                                            placeholder="Örn: Togg"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="model">Model</Label>
                                        <Input
                                            id="model"
                                            value={form.data.model || ''}
                                            onChange={(e) => form.setData('model', e.target.value)}
                                            placeholder="Örn: T10"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="plate">Plaka</Label>
                                    <Input
                                        id="plate"
                                        value={form.data.plate || ''}
                                        onChange={(e) => form.setData('plate', e.target.value)}
                                        placeholder="Örn: 34 ABC 123"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="battery">Pil Kapasitesi (kWh)</Label>
                                        <Input
                                            id="battery"
                                            type="number"
                                            step="0.1"
                                            value={form.data.battery_capacity ?? ''}
                                            onChange={(e) =>
                                                form.setData(
                                                    'battery_capacity',
                                                    e.target.value ? parseFloat(e.target.value) : undefined,
                                                )
                                            }
                                            placeholder="Örn: 52.5"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="year">Model Yılı</Label>
                                        <Input
                                            id="year"
                                            type="number"
                                            value={form.data.year ?? ''}
                                            onChange={(e) =>
                                                form.setData(
                                                    'year',
                                                    e.target.value ? parseInt(e.target.value, 10) : undefined,
                                                )
                                            }
                                            placeholder="Örn: 2024"
                                            min="1900"
                                            max="2100"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="kilometer">Kilometre</Label>
                                    <Input
                                        id="kilometer"
                                        type="number"
                                        value={form.data.kilometer ?? ''}
                                        onChange={(e) =>
                                            form.setData(
                                                'kilometer',
                                                e.target.value ? parseInt(e.target.value, 10) : undefined,
                                            )
                                        }
                                        placeholder="Örn: 15000"
                                        min="0"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                                    İptal
                                </Button>
                                <Button type="submit" disabled={form.processing}>
                                    {editingVehicle ? 'Güncelle' : 'Ekle'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Aracı silmek istediğinize emin misiniz?</AlertDialogTitle>
                            <AlertDialogDescription>
                                {vehicleToDelete && (
                                    <>
                                        <strong>{vehicleToDelete.name}</strong> adlı aracı silmek üzeresiniz. Bu araca
                                        ait şarj kayıtları da silinecek.
                                        {vehicles.length === 1 && vehicleToDelete.is_active && (
                                            <span className="mt-2 block text-destructive">
                                                Bu son aracınız olduğu için silme işlemi yapılamaz.
                                            </span>
                                        )}
                                    </>
                                )}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>İptal</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDelete}
                                disabled={vehicles.length === 1 && vehicleToDelete?.is_active}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                Sil
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
