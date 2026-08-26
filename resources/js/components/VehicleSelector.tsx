import { router, usePage } from '@inertiajs/react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Car } from 'lucide-react';
import { PageProps, Vehicle } from '@/types';

interface VehicleSelectorProps {
    vehicles: Vehicle[];
    activeVehicle: Vehicle | null;
}

export function VehicleSelector({ vehicles, activeVehicle }: VehicleSelectorProps) {
    if (vehicles.length === 0) {
        return null;
    }

    return (
        <div className="flex items-center gap-2 border-b border-sidebar-border px-4 py-3">
            <Car className="h-4 w-4 text-muted-foreground" />
            <Select
                value={activeVehicle?.id.toString()}
                onValueChange={(id) => {
                    router.post(`/vehicles/${id}/set-current`, {}, {
                        preserveScroll: true,
                    });
                }}
            >
                <SelectTrigger className="h-8 border-0 bg-transparent p-0 text-sm focus:ring-0 focus-visible:ring-0">
                    <SelectValue placeholder="Araç seçin" />
                </SelectTrigger>
                <SelectContent>
                    {vehicles.map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                            <span className="flex items-center gap-2">
                                {vehicle.brand} {vehicle.model}
                                {vehicle.plate && (
                                    <span className="text-muted-foreground">({vehicle.plate})</span>
                                )}
                            </span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

export function useSharedVehicles() {
    const { props } = usePage<PageProps<{ vehicles?: Vehicle[]; activeVehicle?: Vehicle | null }>>();
    return {
        vehicles: props.vehicles ?? [],
        activeVehicle: props.activeVehicle ?? null,
    };
}
