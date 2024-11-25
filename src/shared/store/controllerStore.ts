import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { ICostume } from '@/entities/costume';

import { TGender } from '../types';

type State = {
    gender?: TGender;
    costume?: ICostume;
};

type Actions = {
    setGender: (gender: TGender) => void;
    setCostume: (costume: ICostume) => void;
    reset: () => void;
};

const initialState: State = {
    gender: undefined,
    costume: undefined,
};

export const useControllerStore = create<State & Actions>()(
    devtools((set) => ({
        ...initialState,
        setGender: (gender) => set({ gender }),
        setCostume: (costume) => set({ costume }),
        reset: () => set(initialState),
    })),
);
