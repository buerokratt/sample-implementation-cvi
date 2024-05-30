import React, {
    CSSProperties,
    forwardRef,
    ReactNode,
    StyleHTMLAttributes,
} from 'react';
import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import clsx from 'clsx';

import '../icon.scss';

type IconProps = StyleHTMLAttributes<CSSProperties> & {
    label?: string | null;
    icon: ReactNode;
    size?: 'small' | 'medium' | 'large';
    className?: string;
};

const IconComponent = forwardRef<HTMLSpanElement, IconProps>(
    ({ label, icon, className, size = 'small', ...rest }, ref) => {
        const iconClasses = clsx('icon', `icon--${size}`, className);

        return (
            <AccessibleIcon.Root label={label ?? ''}>
        <span ref={ref} className={iconClasses} style={rest.style}>
          {icon}
        </span>
            </AccessibleIcon.Root>
        );
    }
);

export default IconComponent;
