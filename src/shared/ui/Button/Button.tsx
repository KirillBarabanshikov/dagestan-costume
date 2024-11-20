import clsx from 'clsx';
import { ButtonHTMLAttributes, FC } from 'react';

import styles from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: 'green' | 'lightgreen' | 'white';
    fullWidth?: boolean;
}

export const Button: FC<IButtonProps> = ({ theme = 'green', fullWidth = false, className, children, ...props }) => {
    return (
        <button className={clsx(styles.button, styles[theme], fullWidth && styles.fullWidth, className)} {...props}>
            {children}
        </button>
    );
};
