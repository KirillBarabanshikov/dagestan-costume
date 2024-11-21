import styles from './MainScreensaver.module.scss';

export const MainScreensaver = () => {
    return (
        <div className={styles.mainScreensaver}>
            <video autoPlay loop muted playsInline>
                <source src={'/video.mp4'} type='video/mp4' />
            </video>
            <h1>Примерим Дагестанский костюм?</h1>
        </div>
    );
};
