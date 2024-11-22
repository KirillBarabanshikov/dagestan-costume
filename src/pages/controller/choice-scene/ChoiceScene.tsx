import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import InstructionsIcon from '@/shared/assets/icons/instructions.svg?react';
import { Button, Modal } from '@/shared/ui';

import styles from './ChoiceScene.module.scss';

const data = [
    {
        id: 1,
        title: 'Агулка',
        image: '/scene1.png',
    },
    {
        id: 2,
        title: 'Агулка 2',
        image: '/scene2.png',
    },
];

export const ChoiceScene = () => {
    const [isOpenFirst, setIsOpenFirst] = useState(false);
    const [isOpenSecond, setIsOpenSecond] = useState(false);
    const swiperRef = useRef<SwiperType | null>(null);
    const navigate = useNavigate();

    const handleSelect = () => {
        setIsOpenFirst(true);
    };

    const handleChangeScene = () => {
        swiperRef.current?.slideNext();
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
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        className={'choice-scene-slider'}
                    >
                        {data.map((costume) => {
                            return (
                                <SwiperSlide key={costume.id} className={styles.slide}>
                                    <img src={costume.image} alt={costume.title} draggable={false} />
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
                        <Button
                            fullWidth
                            onClick={() => {
                                setIsOpenFirst(false);
                                setIsOpenSecond(true);
                            }}
                        >
                            сделать фото
                        </Button>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={isOpenSecond} onClose={() => setIsOpenFirst(false)} maxWidth={'1022px'}>
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
        </>
    );
};
