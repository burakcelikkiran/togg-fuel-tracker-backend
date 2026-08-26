import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { formatMonthShort } from '@/lib/date-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, TrendingUp, Building2, Hash, Car as CarIcon } from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import { DashboardData, PageProps, Vehicle } from '@/types';

const COLORS = [
    'hsl(152, 60%, 45%)',
    'hsl(196, 70%, 55%)',
    'hsl(280, 55%, 60%)',
    'hsl(35, 85%, 60%)',
    'hsl(340, 65%, 60%)',
];

interface DashboardPageProps extends PageProps {
    dashboard: DashboardData;
    vehicles: Vehicle[];
    activeVehicle: Vehicle | null;
}

export default function Dashboard({ dashboard, activeVehicle }: DashboardPageProps) {
    if (!activeVehicle) {
        return (
            <AppLayout>
                <Head title="Dashboard" />
                <div className="flex flex-col items-center justify-center py-20">
                    <CarIcon className="mb-4 h-16 w-16 text-muted-foreground" />
                    <h2 className="mb-2 text-xl font-semibold">Henüz aracınız yok</h2>
                    <p className="mb-6 text-center text-muted-foreground">
                        Şarj takibine başlamak için ilk aracınızı ekleyin.
                    </p>
                    <Button asChild>
                        <Link href="/vehicles">Araç Ekle</Link>
                    </Button>
                </div>
            </AppLayout>
        );
    }

    const summaryCards = [
        {
            title: 'Toplam Harcama',
            value: `₺${dashboard.total_amount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`,
            icon: TrendingUp,
        },
        {
            title: 'Toplam kWh',
            value: `${dashboard.total_kwh.toLocaleString('tr-TR', { minimumFractionDigits: 1 })} kWh`,
            icon: Zap,
        },
        {
            title: 'Ort. Birim Fiyat',
            value: `₺${dashboard.avg_unit_price.toFixed(2)}/kWh`,
            icon: Building2,
        },
        { title: 'Şarj Sayısı', value: dashboard.total_charges.toString(), icon: Hash },
    ];

    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">{activeVehicle.name}</h1>
                    <p className="text-muted-foreground">
                        {activeVehicle.brand && activeVehicle.model
                            ? `${activeVehicle.brand} ${activeVehicle.model}`
                            : 'Dashboard'}
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {summaryCards.map((card) => (
                        <Card key={card.title}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {card.title}
                                </CardTitle>
                                <card.icon className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{card.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Aylık Harcama Trendi</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={dashboard.monthly_trend}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis
                                        dataKey="month"
                                        stroke="hsl(var(--muted-foreground))"
                                        fontSize={12}
                                        tickFormatter={formatMonthShort}
                                    />
                                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--card))',
                                            border: '1px solid hsl(var(--border))',
                                            borderRadius: '8px',
                                        }}
                                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                                        labelFormatter={formatMonthShort}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="amount"
                                        stroke="hsl(var(--primary))"
                                        strokeWidth={2}
                                        dot={{ fill: 'hsl(var(--primary))' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Firma Dağılımı</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={dashboard.company_distribution}
                                        dataKey="amount"
                                        nameKey="company"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={90}
                                        label={({ company }) => company}
                                    >
                                        {dashboard.company_distribution.map((_, i) => (
                                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--card))',
                                            border: '1px solid hsl(var(--border))',
                                            borderRadius: '8px',
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Son Şarj Kayıtları</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border text-left text-muted-foreground">
                                        <th className="pb-2 pr-4">Tarih</th>
                                        <th className="pb-2 pr-4">Firma</th>
                                        <th className="pb-2 pr-4 text-right">kWh</th>
                                        <th className="pb-2 text-right">Tutar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dashboard.recent_charges.map((charge) => (
                                        <tr key={charge.id} className="border-b border-border/50">
                                            <td className="py-2 pr-4">{charge.date}</td>
                                            <td className="py-2 pr-4">{charge.company}</td>
                                            <td className="py-2 pr-4 text-right">{charge.kwh}</td>
                                            <td className="py-2 text-right">₺{charge.amount.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
