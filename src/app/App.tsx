import './styles/index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { Suspense } from 'react';

export const App = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router} />
        </Suspense>
    );
};
