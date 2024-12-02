import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { sendEvent, sendUserFace } from '@/shared/api';
import Person from '@/shared/assets/icons/person.svg?react';
import { useSSE } from '@/shared/hooks';
import { ICostume, IScene, TSSEActions } from '@/shared/types';
import { AlertModal, Loader, Timer } from '@/shared/ui';

import styles from './Camera.module.scss';

export const Camera = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showTimer, setShowTimer] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const scene = location.state as IScene;

    useSSE<{ action: TSSEActions; payload: ICostume }>({
        onMessage: (data) => {
            if (data.action === 'back') {
                navigate('/costume', { state: data.payload });
            }
            if (data.action === 'exit') {
                navigate('/');
            }
        },
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (!canvas || !video) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const videoHeight = 2160;
        const videoWidth = 3840;

        let animationFrameId: number;

        const drawToCanvas = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const scale = Math.max(canvas.width / video.videoWidth, canvas.height / video.videoHeight);
            const x = (canvas.width - video.videoWidth * scale) / 2;
            const y = (canvas.height - video.videoHeight * scale) / 2;

            ctx.save();
            ctx.translate(canvas.width, 0); // Зеркальное отображение
            ctx.scale(-1, 1);
            ctx.drawImage(video, x, y, video.videoWidth * scale, video.videoHeight * scale);
            ctx.restore();

            animationFrameId = requestAnimationFrame(drawToCanvas);
        };

        const handleStream = (stream: MediaStream) => {
            const video = videoRef.current;
            if (!video) return;

            video.srcObject = stream;

            video.onloadedmetadata = () => {
                video
                    .play()
                    .then(() => {
                        drawToCanvas();
                        setShowTimer(true);
                    })
                    .catch((err) => console.error('Error playing video:', err));
            };
        };

        navigator.mediaDevices
            .getUserMedia({
                video: {
                    width: { ideal: videoWidth },
                    height: { ideal: videoHeight },
                    deviceId: 'e4d1cfef655ffd2b9c090465375978aa41e08b3bec973906cac672fa6ad2fd0e',
                },
                audio: false,
            })
            .then(handleStream)
            .catch((err) => console.error('Error accessing camera:', err));

        return () => {
            cancelAnimationFrame(animationFrameId);
            if (video.srcObject) {
                (video.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    const createPhoto = (): Promise<File | undefined> => {
        const canvas = canvasRef.current;
        if (!canvas) return Promise.resolve(undefined);

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                if (blob) {
                    const photo = new File([blob], 'photo.png', { type: 'image/png' });
                    resolve(photo);
                } else {
                    console.error('Failed to create blob from canvas.');
                    resolve(undefined);
                }
            }, 'image/png');
        });
    };

    const handleTimerEnd = async () => {
        try {
            setShowTimer(false);
            setIsLoading(true);
            videoRef.current?.pause();
            await sendEvent({ action: 'photoLoading' });
            const photo = await createPhoto();
            if (photo) {
                const { faceSwapPhotoId } = await sendUserFace({ userFaceImage: photo, sceneId: scene.id });
                await sendEvent({ action: 'photoCreated', payload: faceSwapPhotoId });
                navigate('/result', { state: faceSwapPhotoId });
            }
        } catch (error) {
            console.error(error);
            await sendEvent({ action: 'photoError' });
            setIsLoading(false);
            setShowAlert(true);
        }
    };

    return (
        <div className={styles.camera}>
            <h2 className={styles.title}>Встаньте в область</h2>
            <canvas ref={canvasRef} width={2160} height={3840} />
            <video ref={videoRef} style={{ display: 'none' }} />
            <Person className={styles.person} />
            {showTimer && <Timer time={5} onEnd={handleTimerEnd} className={styles.timer} />}
            <Loader isLoading={isLoading} title={'Пожалуйста,подождите...'} variant={'main'} />
            <AlertModal isOpen={showAlert} onClose={() => {}} isError onError={() => {}} />
        </div>
    );
};
