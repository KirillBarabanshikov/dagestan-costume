import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui';

import styles from './Qr.module.scss';

export const Qr = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.qr}>
            <div className={styles.wrap}>
                <h2>ПОЛУЧИТЕ ФОТО</h2>
                <p>Отсканируйте или сфотографируйте QR-КОД, чтобы получить цифровую версию фото</p>
                <img src={'/qr.png'} alt={'qr'} className={styles.qr} />
                <Button fullWidth onClick={() => navigate('/controller')}>
                    на главную
                </Button>
            </div>
        </div>
    );
};
