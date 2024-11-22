import './styles/index.css';
import './styles/swiper.scss';
// @ts-ignore
import 'swiper/css';

import { RouterProvider } from 'react-router-dom';

import { router } from './router/router';

export const App = () => {
    return <RouterProvider router={router} />;
};
