import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import { fetchFaceSwapPhoto, sendEvent } from '@/shared/api';
import { API_URL } from '@/shared/const';
import { useControllerStore } from '@/shared/store';
import { Button, PhotoPreview } from '@/shared/ui';

import styles from './Photo.module.scss';

export const Photo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { costume, setScene } = useControllerStore((state) => state);
    const id = location.state as number;

    const { data: photo } = useQuery({
        queryKey: ['photo', id],
        queryFn: () => fetchFaceSwapPhoto(id),
        enabled: !!id,
    });

    const handleRetry = async () => {
        try {
            await sendEvent({ action: 'retry', payload: costume });
            setScene(undefined);
            navigate('/controller/choice-costume');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.photo}>
            <div className={styles.wrap}>
                <h2>Ваша фотография</h2>
                <p>
                    Вы можете сохранить фото и перейти к оплате чтобы получить полноцветную версию, или попробовать ещё
                    раз
                </p>
                <div className={styles.buttons}>
                    <Button onClick={() => navigate('/controller/payment')}>сохранить и напечатать</Button>
                    <Button onClick={handleRetry}>повторить</Button>
                </div>
            </div>
            {photo && <PhotoPreview src={API_URL + photo.image} variant={'controller'} />}
        </div>
    );
};
