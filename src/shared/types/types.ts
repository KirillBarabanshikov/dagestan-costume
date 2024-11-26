export type TGender = 'male' | 'female';

export type TSSEActions = 'selectCostume' | 'selectScene' | 'photoLoading' | 'photoCreated' | 'retry' | 'exit' | 'back';

export interface ICostume {
    id: number;
    gender: TGender;
    image: string;
    title: string;
    description: string;
    videoName: string;
    scenes: IScene[];
}

export interface IScene {
    id: number;
    imageBackground: string;
    image: string;
}
