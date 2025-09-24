export interface GenerateImageRequest {
  prompt: string;
  imageUrl: string;
}

export interface GenerateImageResponse {
  imageUrl?: string;
  revisedPrompt?: string;
  error?: string;
}
