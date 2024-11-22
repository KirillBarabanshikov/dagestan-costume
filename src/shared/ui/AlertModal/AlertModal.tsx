import { FC } from 'react';
import { Button, Modal } from '@/shared/ui';
import SuccessIcon from '@/shared/assets/icons/success.svg?react';
import ErrorIcon from '@/shared/assets/icons/error.svg?react';
import styles from './AlertModal.module.scss';

interface IAlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    onError: () => void;
    isError?: boolean;
}

export const AlertModal: FC<IAlertModalProps> = ({ isOpen, onClose, onSuccess, onError, isError }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.body}>
                {isError ? <ErrorIcon className={styles.icon} /> : <SuccessIcon className={styles.icon} />}
                <h3>{isError ? 'Произошла ошибка' : 'Оплата прошла успешно'}</h3>
                <p>
                    {isError
                        ? 'Пожалуйста, попробуйте еще раз.'
                        : 'Нажмите продолжить, чтобы получить цифровую версию фото'}
                </p>
                <div className={styles.buttons}>
                    {isError ? (
                        <>
                            <Button onClick={onClose}>назад</Button>
                            <Button theme={'lightgreen'} onClick={onError}>
                                на главную
                            </Button>
                        </>
                    ) : (
                        <Button onClick={onSuccess}>продолжить</Button>
                    )}
                </div>
            </div>
        </Modal>
    );
};
