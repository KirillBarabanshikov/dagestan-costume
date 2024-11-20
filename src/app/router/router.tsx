import { createBrowserRouter } from 'react-router-dom';

import {
    ChoiceCostume,
    ChoiceScene,
    ControllerPage,
    ControllerScreensaver,
    Payment,
    Photo,
    Qr,
} from '@/pages/controller';
import { Camera, Costume, MainPage, MainScreensaver, Result } from '@/pages/main';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
        children: [
            {
                path: '',
                element: <MainScreensaver />,
            },
            {
                path: 'costume',
                element: <Costume />,
            },
            {
                path: 'camera',
                element: <Camera />,
            },
            {
                path: 'result',
                element: <Result />,
            },
        ],
    },
    {
        path: '/controller',
        element: <ControllerPage />,
        children: [
            {
                path: '',
                element: <ControllerScreensaver />,
            },
            {
                path: 'choice-costume',
                element: <ChoiceCostume />,
            },
            {
                path: 'choice-scene',
                element: <ChoiceScene />,
            },
            {
                path: 'photo',
                element: <Photo />,
            },
            {
                path: 'payment',
                element: <Payment />,
            },
            {
                path: 'qr',
                element: <Qr />,
            },
        ],
    },
]);
