import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PAYMENT_PASSWORD, PHOTO_COST } from '@/shared/consts';
import { AlertModal, Button, Keyboard, Modal, SecretButton } from '@/shared/ui';

import styles from './Payment.module.scss';

export const Payment = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [showKeyboard, setShowKeyboard] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    const onSubmit = () => {
        if (!inputRef.current) return;
        if (inputRef.current.value === PAYMENT_PASSWORD) {
            setShowAlert(true);
            setShowKeyboard(false);
        }
    };

    return (
        <>
            <SecretButton onSecretAction={() => setShowKeyboard(true)} />
            <div className={styles.payment}>
                <div className={styles.wrap}>
                    <h2>Произведите оплату</h2>
                    <p>
                        Для получения фото необходимо произвести оплату. После оплаты вы сможете забрать напечатанную
                        фотографию, а также получить цифровую версии фото. Следуйте инструкции на экране.
                    </p>
                    <div className={styles.priceWrap}>
                        <div className={styles.priceLabel}>Сумма к оплате:</div>
                        <div className={styles.price}>{PHOTO_COST}₽</div>
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
                isOpen={showAlert}
                onClose={() => setShowAlert(false)}
                onSuccess={() => navigate('/controller/qr')}
                onError={() => navigate('/controller')}
            />
            <Modal isOpen={showKeyboard} onClose={() => setShowKeyboard(false)}>
                <div className={styles.modalBody}>
                    <h3>Введите пароль</h3>
                    <input type={'password'} ref={inputRef} placeholder={'Пароль'} />
                    <Keyboard inputRef={inputRef} onEnter={onSubmit} />
                    <Button onClick={onSubmit}>Отправить</Button>
                </div>
            </Modal>
        </>
    );
};
