import { TGender } from '@/shared/types';

export interface ICostume {
    id: number;
    gender: TGender;
    image: string;
    title: string;
    description: string;
    scenes: IScene[];
}

export interface IScene {
    id: number;
    imageBackground: string;
    image: string;
}
