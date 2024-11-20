import { useState } from 'react';

import FingerIcon from '@/shared/assets/icons/finger.svg?react';
import { Button, Modal } from '@/shared/ui';

import styles from './ControllerScreensaver.module.scss';

export const ControllerScreensaver = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div onClick={() => setIsOpen(true)} className={styles.screensaver}>
                <div className={styles.hintWrap}>
                    <FingerIcon />
                    <span>Коснитесь экрана, чтобы начать</span>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className={styles.modalBody}>
                    <h2>ВЫБОР КОСТЮМА</h2>
                    <Button fullWidth>Мужской</Button>
                    <Button fullWidth>Женский</Button>
                </div>
            </Modal>
        </>
    );
};
