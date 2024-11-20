import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

const MainPage = lazy(() => import('@/pages/main/MainPage.tsx'));
const ControllerPage = lazy(() => import('@/pages/controller/ControllerPage.tsx'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
    },
    {
        path: '/controller',
        element: <ControllerPage />,
    },
]);
