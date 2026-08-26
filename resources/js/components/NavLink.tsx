import { Link } from '@inertiajs/react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface NavLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
    activeClassName?: string;
    inactiveClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
    ({ className, activeClassName, inactiveClassName, href, ...props }, ref) => {
        return (
            <Link
                ref={ref}
                href={href}
                className={cn(className, inactiveClassName)}
                {...props}
            />
        );
    },
);

NavLink.displayName = 'NavLink';

export { NavLink };
