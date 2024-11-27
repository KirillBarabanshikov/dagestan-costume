import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper as SwiperType } from 'swiper';

import { sendChoiceScene, sendEvent } from '@/shared/api';
import InstructionsIcon from '@/shared/assets/icons/instructions.svg?react';
import { useSSE } from '@/shared/hooks';
import { useControllerStore } from '@/shared/store';
import { TSSEActions } from '@/shared/types';
import { Button, Loader, Modal } from '@/shared/ui';

import styles from './ChoiceScene.module.scss';
import { SceneSlider } from './SceneSlider.tsx';

export const ChoiceScene = () => {
    const [modalState, setModalState] = useState<'none' | 'first' | 'second'>('none');
    const [isLoading, setIsLoading] = useState(false);
    const swiperRef = useRef<SwiperType | null>(null);
    const navigate = useNavigate();
    const { costume, scene, setScene, statisticId } = useControllerStore((state) => state);

    useSSE<{ action: TSSEActions }>({
        onMessage: (data) => {
            if (data.action === 'photoLoading') {
                setModalState('none');
                setIsLoading(true);
            }
            if (data.action === 'photoCreated') {
                setIsLoading(false);
                navigate('/photo');
            }
        },
    });

    const currentScene = useMemo(() => {
        return costume?.scenes.find((s) => s.id === scene?.id) || costume!.scenes[0];
    }, [costume, scene]);

    const currentSlide = useMemo(() => {
        const index = costume?.scenes.findIndex((s) => s.id === scene?.id) || 0;
        return index >= 0 ? index : 0;
    }, [costume, scene]);

    const handleChangeSlide = (swiper: SwiperType) => {
        const newScene = costume?.scenes[swiper.realIndex];
        if (newScene) {
            setScene(newScene);
        }
    };

    const handleChangeScene = () => {
        if (!costume) return;

        if (costume.scenes.length >= 4) {
            swiperRef.current?.slideNext();
        } else {
            const nextIndex = currentSlide === costume.scenes.length - 1 ? 0 : currentSlide + 1;
            swiperRef.current?.slideTo(nextIndex);
        }
    };

    const handleCreatePhoto = async () => {
        try {
            setModalState('second');
            if (statisticId) {
                await sendChoiceScene(statisticId, currentScene.id);
            }
            await sendEvent({ action: 'selectScene', payload: costume });
        } catch (error) {
            console.error(error);
        }
    };

    const handleBackEvent = async () => {
        try {
            await sendEvent({ action: 'back', payload: costume });
            setModalState('first');
        } catch (error) {
            console.error(error);
        }
    };

    if (!costume) return <></>;

    return (
        <>
            <div className={styles.choiceScene}>
                <div className={styles.titleWrap}>
                    <h2>Выбор сцены</h2>
                    <Button
                        theme={'lightgreen'}
                        onClick={() => {
                            navigate('/controller/choice-costume');
                            setScene(undefined);
                        }}
                        className={styles.button}
                    >
                        назад
                    </Button>
                </div>

                <div className={styles.sliderWrap}>
                    <SceneSlider
                        scenes={costume.scenes}
                        onSlideChange={handleChangeSlide}
                        swiperRef={swiperRef}
                        currentSlide={currentSlide}
                    />
                </div>
                <div className={styles.buttonsWrap}>
                    <Button theme={'white'} onClick={handleChangeScene} className={styles.prev}>
                        Другая позиция
                    </Button>
                    <Button onClick={() => setModalState('first')}>выбрать</Button>
                </div>
            </div>
            <Modal isOpen={modalState === 'first'} onClose={() => setModalState('none')} maxWidth={'1788px'}>
                <div className={styles.modalBody}>
                    <h2>Инструкция</h2>
                    <div className={styles.descriptionWrap}>
                        <ol>
                            <li>
                                Нажмите на кнопку «Сделать фото», после чего встаньте в размеченную область на полу так,
                                чтобы вы полностью помещались в силует на экране.
                            </li>
                            <li>
                                По завершении фотографирования снимок можно будет переснять или опроведя оплату получить
                                электронную и печатную версии.
                            </li>
                        </ol>
                        <InstructionsIcon />
                    </div>
                    <div className={styles.buttons}>
                        <Button theme={'lightgreen'} fullWidth onClick={() => setModalState('none')}>
                            Назад
                        </Button>
                        <Button fullWidth onClick={handleCreatePhoto}>
                            сделать фото
                        </Button>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={modalState === 'second'} onClose={() => setModalState('none')} maxWidth={'1022px'}>
                <div className={styles.modalBody}>
                    <h2>Инструкция</h2>
                    <div className={styles.descriptionWrap}>
                        <p>
                            Встаньте в размеченную область на полу так, чтобы вы полностью помещались в силует на экране
                        </p>
                        <InstructionsIcon />
                    </div>
                    <div className={styles.buttons}>
                        <Button theme={'lightgreen'} fullWidth onClick={handleBackEvent}>
                            Назад
                        </Button>
                    </div>
                </div>
            </Modal>
            <Loader
                isLoading={isLoading}
                title={'Пожалуйста,подождите...'}
                subtitle={'Ваша фотография обрабатывается'}
                variant={'controller'}
            />
        </>
    );
};
