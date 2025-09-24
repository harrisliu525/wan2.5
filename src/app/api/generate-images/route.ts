import type { GenerateImageRequest } from '@/ai/image/lib/api-types';
import { type NextRequest, NextResponse } from 'next/server';

const APICORE_ENDPOINT = 'https://api.apicore.ai/v1/images/generations';
const APICORE_MODEL = 'gemini-2.5-flash-image';
const DEFAULT_IMAGE_SIZE = '1x1';
const DEFAULT_IMAGE_COUNT = 1;

type ApicoreImagePayload = {
  prompt: string;
  model: string;
  size: string;
  n: number;
};

type ApicoreImageResponse = {
  created?: number;
  data?: Array<{
    revised_prompt?: string;
    url?: string;
  }>;
  error?: string;
};

export async function POST(req: NextRequest) {
  const requestId = Math.random().toString(36).slice(2);

  const { prompt, imageUrl } = (await req.json()) as GenerateImageRequest;

  if (!prompt || !prompt.trim() || !imageUrl || !imageUrl.trim()) {
    const error = 'Missing prompt or image URL';
    console.error(`${error} [requestId=${requestId}]`);
    return NextResponse.json({ error }, { status: 400 });
  }

  const apiKey = process.env.APICORE_API_KEY;

  if (!apiKey) {
    const error = 'Apicore API key is not configured';
    console.error(`${error} [requestId=${requestId}]`);
    return NextResponse.json({ error }, { status: 500 });
  }

  const payload: ApicoreImagePayload = {
    prompt: `${imageUrl.trim()} ${prompt.trim()}`.trim(),
    model: APICORE_MODEL,
    size: DEFAULT_IMAGE_SIZE,
    n: DEFAULT_IMAGE_COUNT,
  };

  try {
    const response = await fetch(APICORE_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Apicore request failed [requestId=${requestId}, status=${response.status}]: ${errorText}`
      );
      return NextResponse.json(
        {
          error:
            'Failed to generate image. Please verify your Apicore configuration.',
        },
        { status: response.status }
      );
    }

    const data = (await response.json()) as ApicoreImageResponse;
    const imageData = data.data?.[0];

    if (!imageData?.url) {
      const error = 'Apicore response did not include an image URL';
      console.error(`${error} [requestId=${requestId}]`);
      return NextResponse.json(
        {
          error:
            'Image generation succeeded but no image URL was returned. Please try again later.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        imageUrl: imageData.url,
        revisedPrompt: imageData.revised_prompt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      `Unexpected error generating image [requestId=${requestId}]:`,
      error
    );
    return NextResponse.json(
      {
        error: 'Failed to generate image. Please try again later.',
      },
      { status: 500 }
    );
  }
}
