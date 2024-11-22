import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AlertModal, Button } from '@/shared/ui';

import styles from './Payment.module.scss';

export const Payment = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsOpen(true);
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    const navigate = useNavigate();

    return (
        <>
            <div className={styles.payment}>
                <div className={styles.wrap}>
                    <h2>Произведите оплату</h2>
                    <p>
                        Для получения фото необходимо произвести оплату. После оплаты вы сможете забрать напечатанную
                        фотографию, а также получить цифровую версии фото. Следуйте инструкции на экране.
                    </p>
                    <div className={styles.priceWrap}>
                        <div className={styles.priceLabel}>Сумма к оплате:</div>
                        <div className={styles.price}>200₽</div>
                    </div>
                    <Button
                        theme={'lightgreen'}
                        fullWidth
                        onClick={() => navigate('/controller/photo')}
                        className={styles.button}
                    >
                        Назад
                    </Button>
                </div>
            </div>
            <AlertModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSuccess={() => navigate('/controller/qr')}
                onError={() => navigate('/controller')}
            />
        </>
    );
};
