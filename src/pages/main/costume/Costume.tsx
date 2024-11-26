import styles from './Costume.module.scss';

export const Costume = () => {
    return (
        <div className={styles.costume}>
            <video autoPlay loop muted playsInline>
                <source src={'/video.mp4'} type='video/mp4' />
            </video>
        </div>
    );
};
