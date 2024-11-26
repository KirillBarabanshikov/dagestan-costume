import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { ICostume, TGender } from '../types';

type State = {
    gender?: TGender;
    costume?: ICostume;
    statisticId?: number;
};

type Actions = {
    setGender: (gender: TGender) => void;
    setCostume: (costume: ICostume) => void;
    setStatisticId: (statisticId: number) => void;
    reset: () => void;
};

const initialState: State = {
    gender: undefined,
    costume: undefined,
    statisticId: undefined,
};

export const useControllerStore = create<State & Actions>()(
    devtools(
        (set) => ({
            ...initialState,
            setGender: (gender) => set({ gender }),
            setCostume: (costume) => set({ costume }),
            setStatisticId: (statisticId) => set({ statisticId }),
            reset: () => set(initialState),
        }),
        { name: 'ControllerStore' },
    ),
);
