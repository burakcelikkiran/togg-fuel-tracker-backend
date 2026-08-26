import { PageProps as InertiaPageProps } from '@inertiajs/core';

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Vehicle {
    id: number;
    customer_id: number;
    name: string;
    brand: string | null;
    model: string | null;
    plate: string | null;
    battery_capacity: number | null;
    year: number | null;
    kilometer: number | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface VehicleFormData {
    name: string;
    brand?: string;
    model?: string;
    plate?: string;
    battery_capacity?: number;
    year?: number;
    kilometer?: number;
}

export interface Charge {
    id: number;
    date: string;
    company: string;
    kwh: number;
    amount: number;
    unit_price: number;
    charge_type?: string;
    charge_percentage?: number | null;
}

export interface DashboardData {
    total_amount: number;
    total_kwh: number;
    avg_unit_price: number;
    total_charges: number;
    monthly_trend: { month: string; amount: number }[];
    company_distribution: { company: string; amount: number }[];
    recent_charges: { id: number; date: string; company: string; kwh: number; amount: number }[];
    total_drives: number;
    total_distance_km: number;
    avg_consumption_kwh_per_km: number;
    recent_drives: Array<{
        id: number;
        driven_at: string;
        duration_minutes: number;
        distance_km: number;
        avg_speed: number;
        vehicle: { id: number; name: string; plate: string | null };
    }>;
}

export interface ReportData {
    monthly_trend: { month: string; amount: number }[];
    company_distribution: { company: string; amount: number }[];
    company_avg_price: { company: string; avg_price: number }[];
}

export interface AuthProps {
    user: User | null;
}

export interface FlashProps {
    success?: string | null;
    error?: string | null;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = InertiaPageProps &
    AuthProps &
    FlashProps &
    T;

declare module '@inertiajs/core' {
    interface PageProps extends AuthProps, FlashProps {}
}
