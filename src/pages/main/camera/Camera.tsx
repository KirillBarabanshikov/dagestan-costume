import { useEffect, useRef, useState } from 'react';
import Person from '@/shared/assets/icons/person.svg?react';
import styles from './Camera.module.scss';
import { Loader, Timer } from '@/shared/ui';

export const Camera = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showTimer, setShowTimer] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

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

            ctx.save();
            ctx.drawImage(video, 0, 0, videoWidth, videoHeight, 0, 0, canvas.width, canvas.height);
            ctx.restore();

            ctx.save();
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
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

    const toPhoto = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.toBlob((blob) => {
            if (blob) {
                const file = new File([blob], 'photo.png', { type: 'image/png' });
                console.log('Created File:', file);
            } else {
                console.error('Failed to create blob from canvas.');
            }
        }, 'image/png');
    };

    const handleTimerEnd = () => {
        setShowTimer(false);
        setIsLoading(true);
        toPhoto();
    };

    return (
        <div className={styles.camera}>
            <h2 className={styles.title}>Встаньте в область</h2>
            <canvas ref={canvasRef} width={2160} height={3840} />
            <video ref={videoRef} style={{ display: 'none' }} />
            <Person className={styles.person} />
            {showTimer && <Timer time={5} onEnd={handleTimerEnd} className={styles.timer} />}
            <Loader isLoading={isLoading} title={'Пожалуйста,подождите...'} variant={'main'} />
        </div>
    );
};
