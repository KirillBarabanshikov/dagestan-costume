import { Outlet } from 'react-router-dom';

import styles from './MainPage.module.scss';

export const MainPage = () => {
    return (
        <div className={styles.mainPage}>
            <Outlet />
        </div>
    );
};
