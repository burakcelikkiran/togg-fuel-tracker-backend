import { cn } from '@/lib/utils';

type LogoVariant = 'icon' | 'full';

interface LogoProps {
    className?: string;
    size?: number;
    variant?: LogoVariant;
    alt?: string;
}

const SRC: Record<LogoVariant, string> = {
    icon: '/images/logo-icon.png',
    full: '/images/logo.png',
};

export function Logo({ className, size = 40, variant = 'icon', alt = 'Togg Charge Tracker' }: LogoProps) {
    return (
        <img
            src={SRC[variant]}
            alt={alt}
            width={size}
            height={size}
            className={cn('shrink-0 rounded-full object-contain', className)}
            draggable={false}
        />
    );
}
