import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import InstructionsIcon from '@/shared/assets/icons/instructions.svg?react';
import { Button, Loader, Modal } from '@/shared/ui';

import styles from './ChoiceScene.module.scss';

const data = [
    {
        id: 1,
        image: '/scene1.png',
    },
    {
        id: 2,
        image: '/scene2.png',
    },
];

export const ChoiceScene = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isOpenFirst, setIsOpenFirst] = useState(false);
    const [isOpenSecond, setIsOpenSecond] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const swiperRef = useRef<SwiperType | null>(null);
    const navigate = useNavigate();

    const handleSelect = () => {
        setIsOpenFirst(true);
    };

    const handleChangeScene = () => {
        if (data.length >= 4) {
            return swiperRef.current?.slideNext();
        }

        if (currentIndex === data.length - 1) {
            swiperRef.current?.slideTo(0);
        } else {
            swiperRef.current?.slideNext();
        }
    };

    const handleCreatePhoto = () => {
        setIsOpenFirst(false);
        setIsOpenSecond(true);

        setTimeout(() => {
            setIsOpenSecond(false);
            setIsLoading(true);

            setTimeout(() => {
                navigate('/controller/photo');
            }, 3000);
        }, 3000);
    };

    return (
        <>
            <div className={styles.choiceScene}>
                <div className={styles.titleWrap}>
                    <h2>Выбор сцены</h2>
                    <Button
                        theme={'lightgreen'}
                        onClick={() => navigate('/controller/choice-costume')}
                        className={styles.button}
                    >
                        назад
                    </Button>
                </div>

                <div className={styles.sliderWrap}>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={24}
                        centeredSlides
                        loop={data.length >= 4}
                        onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                    >
                        {data.map((scene, index) => {
                            const realIndex = swiperRef.current?.realIndex || 0;

                            return (
                                <SwiperSlide key={scene.id} className={styles.slide}>
                                    <motion.img
                                        initial={false}
                                        animate={{ scale: realIndex === index ? 1 : 0.55 }}
                                        src={scene.image}
                                        alt={'scene'}
                                        draggable={false}
                                    />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
                <div className={styles.buttonsWrap}>
                    <Button theme={'white'} onClick={handleChangeScene} className={styles.prev}>
                        Другая позиция
                    </Button>
                    <Button onClick={handleSelect}>выбрать</Button>
                </div>
            </div>
            <Modal isOpen={isOpenFirst} onClose={() => setIsOpenFirst(false)} maxWidth={'1788px'}>
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
                        <Button theme={'lightgreen'} fullWidth onClick={() => setIsOpenFirst(false)}>
                            Назад
                        </Button>
                        <Button fullWidth onClick={handleCreatePhoto}>
                            сделать фото
                        </Button>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={isOpenSecond} onClose={() => setIsOpenSecond(false)} maxWidth={'1022px'}>
                <div className={styles.modalBody}>
                    <h2>Инструкция</h2>
                    <div className={styles.descriptionWrap}>
                        <p>
                            Встаньте в размеченную область на полу так, чтобы вы полностью помещались в силует на экране
                        </p>
                        <InstructionsIcon />
                    </div>
                    <div className={styles.buttons}>
                        <Button theme={'lightgreen'} fullWidth onClick={() => setIsOpenSecond(false)}>
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
