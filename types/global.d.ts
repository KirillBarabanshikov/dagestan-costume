declare global {
    interface Window {
        API_URL: string;
        SSE_URL: string;
        JWT_TOKEN: string;
        PAYMENT_PASSWORD: string;
        INACTIVITY_TIMEOUT: number;
    }
}

export {};
