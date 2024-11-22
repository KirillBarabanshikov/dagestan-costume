import clsx from 'clsx';
import { ButtonHTMLAttributes, FC } from 'react';

import styles from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: 'green' | 'lightgreen' | 'white' | 'blur';
    size?: 'default' | 'sm' | 'lg';
    fullWidth?: boolean;
}

export const Button: FC<IButtonProps> = ({
    theme = 'green',
    size = 'default',
    fullWidth = false,
    className,
    children,
    ...props
}) => {
    return (
        <button
            className={clsx(styles.button, styles[theme], styles[size], fullWidth && styles.fullWidth, className)}
            {...props}
        >
            {children}
        </button>
    );
};
