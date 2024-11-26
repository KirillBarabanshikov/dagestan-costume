import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ICostume } from '@/entities/costume';
import { API_URL } from '@/shared/const';
import { useSSE } from '@/shared/hooks';
import { TSSEActions } from '@/shared/types';

import styles from './Costume.module.scss';

export const Costume = () => {
    const location = useLocation();
    const costume = location.state as ICostume;
    const navigate = useNavigate();
    const [selectedCostume, setSelectedCostume] = useState(costume);

    useSSE<{ action: TSSEActions; payload: ICostume }>({
        onMessage: (data) => {
            if (data.action === 'back') {
                navigate('/');
            }
            if (data.action === 'selectCostume') {
                setSelectedCostume(data.payload);
            }
            if (data.action === 'selectScene') {
                navigate('/camera');
            }
        },
    });

    return (
        <div className={styles.costume}>
            {selectedCostume && (
                <video key={selectedCostume.id} autoPlay loop muted playsInline>
                    <source src={`${API_URL}${selectedCostume.videoName}`} />
                </video>
            )}
        </div>
    );
};
