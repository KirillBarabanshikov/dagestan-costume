import { API_URL } from '../const';
import { ICostume, TGender, TSSEActions } from '../types';

export async function fetchCostumes(gender: TGender) {
    try {
        const response = await fetch(API_URL + `/api/costumes?gender=${gender}`);
        return (await response.json()) as Promise<ICostume[]>;
    } catch (error) {
        throw new Error(`response was not ok ${error}`);
    }
}

export async function sendEvent(body: { action: TSSEActions; payload?: any }) {
    try {
        await fetch(API_URL + `/api/events`, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    } catch (error) {
        throw new Error(`response was not ok ${error}`);
    }
}

export async function sendChoiceCostume(costumeId: number) {
    try {
        const response = await fetch(API_URL + `/api/statistic/${costumeId}`);
        return (await response.json()) as Promise<number>;
    } catch (error) {
        throw new Error(`response was not ok ${error}`);
    }
}

export async function sendChoiceScene(statisticId: number, sceneId: number) {
    try {
        const response = await fetch(API_URL + `/api/statistic/${statisticId}/scene/${sceneId}`);
        return (await response.json()) as Promise<number>;
    } catch (error) {
        throw new Error(`response was not ok ${error}`);
    }
}

export async function sendUserFace(body: { userFaceImage: File; sceneId: number }) {
    const formData = new FormData();
    formData.append('userFaceImage', body.userFaceImage);
    formData.append('sceneId', body.sceneId.toString());

    try {
        const response = await fetch(API_URL + '/api/user_faces', {
            method: 'POST',
            body: formData,
        });
        return (await response.json()) as Promise<{ faceSwapPhotoId: number }>;
    } catch (error) {
        throw new Error(`response was not ok ${error}`);
    }
}

export async function fetchFaceSwapPhoto(id: number) {
    try {
        const response = await fetch(API_URL + `/api/face_swap_photos/${id}`);
        return (await response.json()) as Promise<{ id: number; image: string }>;
    } catch (error) {
        throw new Error(`response was not ok ${error}`);
    }
}
