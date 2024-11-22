import { FC } from 'react';
import { Modal } from '@/shared/ui';
import LoaderIcon from '@/shared/assets/icons/loader.svg?react';
import styles from './Loader.module.scss';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface ILoaderProps {
    isLoading: boolean;
    title: string;
    subtitle?: string;
    variant?: 'main' | 'controller';
}

export const Loader: FC<ILoaderProps> = ({ isLoading, title, subtitle, variant = 'main' }) => {
    return (
        <Modal isOpen={isLoading} maxWidth={variant === 'main' ? '1707px' : '1169px'}>
            <div className={clsx(styles.body, styles[variant])}>
                <h2>{title}</h2>
                {subtitle && <p>{subtitle}</p>}
                <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                        repeatType: 'loop',
                        repeat: Infinity,
                        duration: 2,
                        ease: 'linear',
                    }}
                    className={styles.loader}
                >
                    <LoaderIcon />
                </motion.div>
            </div>
        </Modal>
    );
};
