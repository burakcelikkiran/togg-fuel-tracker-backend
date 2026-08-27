import { LayoutDashboard, PlusCircle, History, BarChart3, LogOut, Car } from 'lucide-react';
import { Link, router, usePage } from '@inertiajs/react';
import { VehicleSelector } from '@/components/VehicleSelector';
import { Logo } from '@/components/Logo';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { PageProps, Vehicle } from '@/types';
import { cn } from '@/lib/utils';

const navItems = [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Yeni Kayıt', url: '/charges/create', icon: PlusCircle },
    { title: 'Geçmiş', url: '/charges', icon: History },
    { title: 'Raporlar', url: '/reports', icon: BarChart3 },
    { title: 'Araçlarım', url: '/vehicles', icon: Car },
];

interface AppSidebarProps {
    vehicles: Vehicle[];
    activeVehicle: Vehicle | null;
}

export function AppSidebar({ vehicles, activeVehicle }: AppSidebarProps) {
    const { auth } = usePage<PageProps>().props;
    const { url } = usePage();

    const logout = () => {
        router.post('/logout');
    };

    return (
        <Sidebar className="border-r border-sidebar-border">
            <div className="flex items-center gap-2.5 px-4 py-5">
                <Logo size={40} />
                <div>
                    <h2 className="text-sm font-bold text-foreground">Togg Charge Tracker</h2>
                    <p className="text-xs text-muted-foreground">Şarj harcamalarınız</p>
                </div>
            </div>

            <VehicleSelector vehicles={vehicles} activeVehicle={activeVehicle} />

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menü</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => {
                                const current = url.split('?')[0];
                                const isActive =
                                    item.url === '/charges'
                                        ? current === '/charges'
                                        : current === item.url || current.startsWith(`${item.url}/`);

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link
                                                href={item.url}
                                                className={cn(
                                                    'hover:bg-accent',
                                                    isActive && 'bg-accent font-medium text-accent-foreground',
                                                )}
                                            >
                                                <item.icon className="mr-2 h-4 w-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border p-4">
                <div className="mb-2 truncate text-xs text-muted-foreground">{auth.user?.email}</div>
                <Button variant="ghost" size="sm" className="w-full justify-start" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Çıkış Yap
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}
