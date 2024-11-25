import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { ICostume } from '@/entities/costume';

import { TGender } from '../types';

interface ControllerState {
    gender?: TGender;
    setGender: (gender: TGender) => void;
    costume?: ICostume;
    setCostume: (costume: ICostume) => void;
}

export const useControllerStore = create<ControllerState>()(
    devtools((set) => ({
        gender: undefined,
        setGender: (gender) => set({ gender }),
        costume: undefined,
        setCostume: (costume) => set({ costume }),
    })),
);
