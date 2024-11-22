import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '@/shared/ui';

import styles from './ChoiceCostume.module.scss';

const data = [
    {
        id: 1,
        title: 'Агулка',
        image: '/1.png',
    },
    {
        id: 2,
        title: 'Агулка 2',
        image: '/2.png',
    },
    {
        id: 3,
        title: 'Агулка 3',
        image: '/3.png',
    },
    {
        id: 4,
        title: 'Агулка 4',
        image: '/2.png',
    },
];

export const ChoiceCostume = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const swiperRef = useRef<SwiperType | null>(null);
    const navigate = useNavigate();

    const handleSelect = () => {
        navigate('/controller/choice-scene');
    };

    return (
        <div className={styles.choiceCostume}>
            <div className={styles.titleWrap}>
                <h2>{data[currentIndex].title}</h2>
                <Button
                    theme={'lightgreen'}
                    size={'sm'}
                    onClick={() => navigate('/controller')}
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
                    {data.map((costume, index) => {
                        const realIndex = swiperRef.current?.realIndex || 0;

                        return (
                            <SwiperSlide key={costume.id} className={styles.slide}>
                                <motion.img
                                    initial={false}
                                    animate={{ scale: realIndex === index ? 1 : 0.55 }}
                                    src={costume.image}
                                    alt={costume.title}
                                    draggable={false}
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
            <div className={styles.buttonsWrap}>
                <Button theme={'white'} onClick={() => swiperRef.current?.slidePrev()} className={styles.prev}>
                    предыдущий
                </Button>
                <Button onClick={handleSelect}>выбрать</Button>
                <Button theme={'white'} onClick={() => swiperRef.current?.slideNext()} className={styles.next}>
                    следующий
                </Button>
            </div>
        </div>
    );
};
