import { Button, PhotoPreview } from '@/shared/ui';
import styles from './Result.module.scss';

export const Result = () => {
    return (
        <div className={styles.result}>
            <PhotoPreview src={'/scene1.png'} variant={'main'} />
            <div className={styles.buttons}>
                <Button size={'lg'} theme={'blur'}>
                    Сохранить и напечатать
                </Button>
                <Button size={'lg'} theme={'blur'}>
                    повторить
                </Button>
            </div>
        </div>
    );
};
