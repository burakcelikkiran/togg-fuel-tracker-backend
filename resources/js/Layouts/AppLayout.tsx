import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/Layouts/AppSidebar';
import { Vehicle, PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

interface AppLayoutProps {
    children: React.ReactNode;
    vehicles?: Vehicle[];
    activeVehicle?: Vehicle | null;
}

export default function AppLayout({ children, vehicles, activeVehicle }: AppLayoutProps) {
    const { props } = usePage<PageProps<{ vehicles?: Vehicle[]; activeVehicle?: Vehicle | null }>>();
    const layoutVehicles = vehicles ?? props.vehicles ?? [];
    const layoutActiveVehicle = activeVehicle ?? props.activeVehicle ?? null;

    return (
        <SidebarProvider>
            <AppSidebar vehicles={layoutVehicles} activeVehicle={layoutActiveVehicle} />
            <SidebarInset>
                <header className="flex h-14 shrink-0 items-center border-b border-border px-4 md:hidden">
                    <SidebarTrigger />
                    <span className="ml-3 font-semibold text-foreground">EV Şarj Takip</span>
                </header>
                <div className="flex-1 p-4 md:p-6 lg:p-8">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
