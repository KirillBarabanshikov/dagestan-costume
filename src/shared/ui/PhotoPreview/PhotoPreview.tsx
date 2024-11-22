import { FC } from 'react';
import styles from './PhotoPreview.module.scss';
import clsx from 'clsx';

interface IPhotoPreviewProps {
    src: string;
    variant: 'main' | 'controller';
}

export const PhotoPreview: FC<IPhotoPreviewProps> = ({ src, variant }) => {
    return <img src={src} alt={'preview'} className={clsx(styles.preview, styles[variant])} />;
};
