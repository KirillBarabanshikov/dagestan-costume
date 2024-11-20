import './styles/index.css';

import { useState } from 'react';

import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal/Modal.tsx';

export const App = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <h1>app</h1>
            <p>app</p>
            <Button fullWidth={true}>Мужской</Button>
            <Button fullWidth={true} theme={'lightgreen'}>
                Мужской
            </Button>
            <Button fullWidth={true} theme={'white'} onClick={() => setIsOpen(true)}>
                Мужской
            </Button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                123
            </Modal>
        </div>
    );
};
