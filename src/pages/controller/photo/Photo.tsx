import { Button, PhotoPreview } from '@/shared/ui';

import styles from './Photo.module.scss';
import { useNavigate } from 'react-router-dom';

export const Photo = () => {
    const navigate = useNavigate();

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
                    <Button onClick={() => navigate('/controller/choice-costume')}>повторить</Button>
                </div>
            </div>
            <PhotoPreview src={'/scene1.png'} variant={'controller'} />
        </div>
    );
};
