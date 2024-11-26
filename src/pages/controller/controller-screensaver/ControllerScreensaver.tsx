import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FingerIcon from '@/shared/assets/icons/finger.svg?react';
import { useControllerStore } from '@/shared/store';
import { TGender } from '@/shared/types';
import { Button, Modal } from '@/shared/ui';

import styles from './ControllerScreensaver.module.scss';

export const ControllerScreensaver = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { setGender, reset } = useControllerStore((state) => state);

    useEffect(() => {
        reset();
    }, []);

    const handleSelect = (gender: TGender) => {
        setGender(gender);
        navigate('/controller/choice-costume');
    };

    return (
        <>
            <div onClick={() => setIsOpen(true)} className={styles.screensaver}>
                <div className={styles.hintWrap}>
                    <motion.div
                        animate={{ scale: [1, 0.8, 1] }}
                        transition={{
                            repeatType: 'loop',
                            repeat: Infinity,
                            duration: 3,
                            ease: 'easeInOut',
                        }}
                    >
                        <FingerIcon />
                    </motion.div>

                    <span>Коснитесь экрана, чтобы начать</span>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className={styles.modalBody}>
                    <h2>ВЫБОР КОСТЮМА</h2>
                    <Button fullWidth onClick={() => handleSelect('male')}>
                        Мужской
                    </Button>
                    <Button fullWidth onClick={() => handleSelect('female')}>
                        Женский
                    </Button>
                </div>
            </Modal>
        </>
    );
};
