import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { fetchCostumes } from '@/entities/costume';
import { API_URL } from '@/shared/const';
import { useControllerStore } from '@/shared/store';
import { Button } from '@/shared/ui';

import styles from './ChoiceCostume.module.scss';
import { sendChoiceCostume } from '@/entities/statistic';

export const ChoiceCostume = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const swiperRef = useRef<SwiperType | null>(null);
    const navigate = useNavigate();
    const { gender, costume, setCostume, setStatisticId } = useControllerStore((state) => state);

    const { data: costumes } = useQuery({
        queryKey: ['costumes', gender],
        queryFn: () => fetchCostumes(gender!),
        enabled: !!gender,
    });

    useEffect(() => {
        if (!costume || !costumes) return;
        let index = costumes.findIndex((element) => element.id === costume.id);
        if (index < 0) index = 0;
        setCurrentIndex(index);
        swiperRef.current?.slideTo(index);
    }, [costume, costumes]);

    const handleSelect = async () => {
        try {
            if (!costumes) return;
            const selectedCostume = costumes[currentIndex];
            if (!selectedCostume) return;
            setCostume(selectedCostume);
            setIsLoading(true);
            const statisticId = await sendChoiceCostume(selectedCostume.id);
            setStatisticId(statisticId);
            navigate('/controller/choice-scene');
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!costumes || !costumes.length) {
        return (
            <div className={styles.choiceCostume}>
                <div className={styles.titleWrap}>
                    <div></div>
                    <Button
                        theme={'lightgreen'}
                        size={'sm'}
                        onClick={() => navigate('/controller')}
                        className={styles.button}
                    >
                        назад
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.choiceCostume}>
            <div className={styles.titleWrap}>
                <h2>{costumes[currentIndex].title}</h2>
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
                    loop={costumes.length >= 4}
                    onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                >
                    {costumes.map((costume, index) => {
                        const realIndex = swiperRef.current?.realIndex || 0;

                        return (
                            <SwiperSlide key={costume.id} className={styles.slide}>
                                <motion.img
                                    initial={false}
                                    animate={{ scale: realIndex === index ? 1 : 0.55 }}
                                    transition={{ damping: 0 }}
                                    src={API_URL + costume.image}
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
                <Button onClick={handleSelect} disabled={isLoading}>
                    выбрать
                </Button>
                <Button theme={'white'} onClick={() => swiperRef.current?.slideNext()} className={styles.next}>
                    следующий
                </Button>
            </div>
        </div>
    );
};
