import { API_URL } from '@/shared/const';

export async function sendChoiceCostume(costumeId: number) {
    const response = await fetch(API_URL + `/api/statistic/${costumeId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return (await response.json()) as Promise<number>;
}
