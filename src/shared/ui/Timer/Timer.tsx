import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';

import styles from './Timer.module.scss';

interface ITimerProps {
    time: number;
    onEnd: () => void;
    className?: string;
}

export const Timer: FC<ITimerProps> = ({ time, onEnd, className }) => {
    const [currentTime, setCurrentTime] = useState(time);

    useEffect(() => {
        if (currentTime <= 0) return onEnd();

        const timerId = setInterval(() => {
            setCurrentTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [currentTime]);

    return <div className={clsx(styles.timer, className)}>{currentTime}</div>;
};
