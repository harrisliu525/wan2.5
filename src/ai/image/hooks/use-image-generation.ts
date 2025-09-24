import { useState } from 'react';
import type { GenerateImageResponse } from '../lib/api-types';

interface StartGenerationParams {
  prompt: string;
  imageUrl: string;
}

interface UseImageGenerationReturn {
  generatedImageUrl: string | null;
  revisedPrompt: string | null;
  isLoading: boolean;
  error: string | null;
  activePrompt: string;
  startGeneration: (params: StartGenerationParams) => Promise<void>;
  reset: () => void;
}

export function useImageGeneration(): UseImageGenerationReturn {
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );
  const [revisedPrompt, setRevisedPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activePrompt, setActivePrompt] = useState('');

  const reset = () => {
    setGeneratedImageUrl(null);
    setRevisedPrompt(null);
    setError(null);
    setActivePrompt('');
  };

  const startGeneration = async ({
    prompt,
    imageUrl,
  }: StartGenerationParams) => {
    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);
    setRevisedPrompt(null);
    setActivePrompt(prompt);

    try {
      const response = await fetch('/api/generate-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, imageUrl }),
      });

      const data = (await response.json()) as GenerateImageResponse;

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      if (data.imageUrl) {
        setGeneratedImageUrl(data.imageUrl);
      } else {
        throw new Error('No image returned from generation request');
      }

      setRevisedPrompt(data.revisedPrompt ?? null);
    } catch (err) {
      console.error('Error generating image:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred while generating the image'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generatedImageUrl,
    revisedPrompt,
    isLoading,
    error,
    activePrompt,
    startGeneration,
    reset,
  };
}
