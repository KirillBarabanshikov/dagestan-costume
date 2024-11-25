import { API_URL } from '@/shared/const';
import { TGender } from '@/shared/types';

import { ICostume } from '../model';

export async function fetchCostumes(gender: TGender) {
    const response = await fetch(API_URL + `/api/costumes?gender=${gender}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return (await response.json()) as Promise<ICostume[]>;
}
