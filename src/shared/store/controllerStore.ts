import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { ICostume, IScene, TGender } from '../types';

type State = {
    gender?: TGender;
    costume?: ICostume;
    scene?: IScene;
    statisticId?: number;
};

type Actions = {
    setGender: (gender: TGender) => void;
    setCostume: (costume: ICostume) => void;
    setScene: (scene: IScene | undefined) => void;
    setStatisticId: (statisticId: number) => void;
    reset: () => void;
};

const initialState: State = {
    gender: undefined,
    costume: undefined,
    scene: undefined,
    statisticId: undefined,
};

export const useControllerStore = create<State & Actions>()(
    devtools(
        (set) => ({
            ...initialState,
            setGender: (gender) => set({ gender }),
            setCostume: (costume) => set({ costume }),
            setScene: (scene) => set({ scene }),
            setStatisticId: (statisticId) => set({ statisticId }),
            reset: () => set(initialState),
        }),
        { name: 'ControllerStore' },
    ),
);
