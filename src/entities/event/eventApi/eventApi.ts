import { API_URL } from '@/shared/const';
import { TSSEActions } from '@/shared/types';

export async function sendEvent(body: { action: TSSEActions; payload?: any }) {
    const response = await fetch(API_URL + `/api/events`, {
        method: 'POST',
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}
