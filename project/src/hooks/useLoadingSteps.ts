import { useState, useEffect } from 'react';

type LoadingStep = 'uploading' | 'processing' | 'complete';

export const useLoadingSteps = (isLoading: boolean) => {
  const [step, setStep] = useState<LoadingStep>('uploading');

  useEffect(() => {
    if (!isLoading) {
      setStep('uploading');
      return;
    }

    const uploadingTimeout = setTimeout(() => {
      setStep('processing');
      
      const processingTimeout = setTimeout(() => {
        setStep('complete');
      }, 600);

      return () => clearTimeout(processingTimeout);
    }, 500);

    return () => clearTimeout(uploadingTimeout);
  }, [isLoading]);

  return step;
};