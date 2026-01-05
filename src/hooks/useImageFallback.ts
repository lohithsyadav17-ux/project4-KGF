import { useState } from 'react';

export const useImageFallback = (fallbackUrl: string = 'https://placehold.co/1024x1024/1a1a1a/gold?text=KGF') => {
    const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        setHasError(true);
        setImgSrc(fallbackUrl);
    };

    return { imgSrc, hasError, handleError };
};
