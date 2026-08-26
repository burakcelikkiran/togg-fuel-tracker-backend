import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { formatMonthShort } from '@/lib/date-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    BarChart,
    Bar,
} from 'recharts';
import { PageProps, ReportData, Vehicle } from '@/types';

const COLORS = [
    'hsl(152, 60%, 45%)',
    'hsl(196, 70%, 55%)',
    'hsl(280, 55%, 60%)',
    'hsl(35, 85%, 60%)',
    'hsl(340, 65%, 60%)',
];

interface ReportsPageProps extends PageProps {
    report: ReportData;
    vehicles: Vehicle[];
    activeVehicle: Vehicle | null;
}

export default function Reports({ report }: ReportsPageProps) {
    const tooltipStyle = {
        backgroundColor: 'hsl(var(--card))',
        border: '1px solid hsl(var(--border))',
        borderRadius: '8px',
    };

    return (
        <AppLayout>
            <Head title="Raporlar" />
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">Raporlar</h1>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Aylık Harcama Trendi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={report.monthly_trend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis
                                    dataKey="month"
                                    stroke="hsl(var(--muted-foreground))"
                                    fontSize={12}
                                    tickFormatter={formatMonthShort}
                                />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                <Tooltip contentStyle={tooltipStyle} labelFormatter={formatMonthShort} />
                                <Line
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={2}
                                    dot={{ fill: 'hsl(var(--primary))' }}
                                    name="Tutar (₺)"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Firma Bazlı Harcama</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={report.company_distribution}
                                        dataKey="amount"
                                        nameKey="company"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label={({ company }) => company}
                                    >
                                        {report.company_distribution.map((_, i) => (
                                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={tooltipStyle} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="mt-4 space-y-2">
                                {report.company_distribution.map((item, i) => (
                                    <div
                                        key={item.company}
                                        className="flex items-center justify-between rounded-lg border border-border px-3 py-2"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="h-3 w-3 rounded-full"
                                                style={{ backgroundColor: COLORS[i % COLORS.length] }}
                                            />
                                            <span className="text-sm font-medium">{item.company}</span>
                                        </div>
                                        <span className="text-sm font-semibold">
                                            ₺{item.amount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Ort. Birim Fiyat Karşılaştırması</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={report.company_avg_price}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis dataKey="company" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                    <Tooltip contentStyle={tooltipStyle} />
                                    <Bar
                                        dataKey="avg_price"
                                        fill="hsl(var(--primary))"
                                        radius={[4, 4, 0, 0]}
                                        name="₺/kWh"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
