'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { uploadFileFromBrowser } from '@/storage/client';
import {
  AlertCircle,
  Check,
  Download,
  ImageIcon,
  Loader2,
  RefreshCw,
  Trash2,
  Upload,
  ZoomIn,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useImageGeneration } from '../hooks/use-image-generation';
import type { Suggestion } from '../lib/suggestions';
import { PromptSuggestions } from './PromptSuggestions';

const MAX_FILE_SIZE = 12 * 1024 * 1024; // 12MB

interface ImagePlaygroundProps {
  suggestions: Suggestion[];
}

export function ImagePlayground({ suggestions }: ImagePlaygroundProps) {
  const t = useTranslations('AIImagePlayground');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [prompt, setPrompt] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedMeta, setUploadedMeta] = useState<{
    signature: string;
    url: string;
  } | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const {
    generatedImageUrl,
    revisedPrompt,
    isLoading,
    error,
    activePrompt,
    startGeneration,
    reset,
  } = useImageGeneration();

  useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

  const isBusy = isUploading || isLoading;
const previewIsOpen = Boolean(generatedImageUrl) && isPreviewOpen;

  const fileSignature = useMemo(() => {
    if (!file) return null;
    return `${file.name}-${file.size}-${file.lastModified}`;
  }, [file]);

  const handleFileSelect = (selectedFile: File | null) => {
    if (!selectedFile) {
      setFile(null);
      setUploadedMeta(null);
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
      setFilePreview(null);
      reset();
      return;
    }

    if (!selectedFile.type.startsWith('image/')) {
      setLocalError(t('upload.invalidType'));
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setLocalError(t('upload.tooLarge'));
      return;
    }

    setLocalError(null);
    setFile(selectedFile);
    setUploadedMeta(null);
    reset();

    if (filePreview) {
      URL.revokeObjectURL(filePreview);
    }
    const previewUrl = URL.createObjectURL(selectedFile);
    setFilePreview(previewUrl);
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    handleFileSelect(selectedFile ?? null);
  };

  const clearFile = () => {
    handleFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const ensureUploaded = async (): Promise<string> => {
    if (!file) {
      throw new Error(t('errors.missingImage'));
    }

    if (uploadedMeta && uploadedMeta.signature === fileSignature) {
      return uploadedMeta.url;
    }

    setIsUploading(true);
    try {
      const result = await uploadFileFromBrowser(file, 'image-inputs');
      setUploadedMeta({
        signature: fileSignature || '',
        url: result.url,
      });
      return result.url;
    } finally {
      setIsUploading(false);
    }
  };

  const handleGenerate = async () => {
    if (!file) {
      setLocalError(t('errors.missingImage'));
      return;
    }

    if (!prompt.trim()) {
      setLocalError(t('errors.missingPrompt'));
      return;
    }

    setLocalError(null);

    try {
      const imageUrl = await ensureUploaded();
      await startGeneration({ prompt, imageUrl });
    } catch (err) {
      console.error('Failed to prepare generation request:', err);
      if (err instanceof Error) {
        setLocalError(
          err.message.toLowerCase().includes('upload')
            ? t('errors.uploadFailed')
            : err.message
        );
      } else {
        setLocalError(t('errors.uploadFailed'));
      }
    }
  };

  const handleSuggestionSelect = (value: string) => {
    setPrompt(value);
    setLocalError(null);
  };

  const openPreview = () => {
    if (generatedImageUrl) {
      setIsPreviewOpen(true);
    }
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  return (
    <div className="rounded-2xl border bg-card/80 p-6 shadow-sm">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="flex flex-col gap-6">
          <div
            className={cn(
              'relative flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed bg-background/60 p-6 text-center transition-colors',
              file ? 'border-muted-foreground/50' : 'border-muted-foreground/30'
            )}
          >
            {filePreview ? (
              <div className="relative w-full max-w-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={filePreview}
                  alt={t('upload.previewAlt')}
                  className="h-auto w-full rounded-lg border object-cover"
                />
                <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                  <span className="truncate" title={file?.name}>
                    {file?.name}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={clearFile}
                    disabled={isBusy}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-base font-medium">{t('upload.title')}</p>
                  <p className="text-sm text-muted-foreground">
                    {t('upload.subtitle')}
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isBusy}
                >
                  {t('upload.button')}
                </Button>
                <p className="text-xs text-muted-foreground">
                  {t('upload.hint')}
                </p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                {t('prompt.help')}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setPrompt('')}
                disabled={isBusy || !prompt}
                aria-label={t('prompt.clear')}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <Textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder={t('prompt.placeholder')}
              rows={4}
              className="resize-none"
              disabled={isBusy}
            />
            <PromptSuggestions
              suggestions={suggestions}
              onSelect={handleSuggestionSelect}
              disabled={isBusy}
            />
          </div>

          {(localError || error) && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span>{localError || error}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <Button type="button" onClick={handleGenerate} disabled={isBusy}>
              {isBusy ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('actions.generating')}
                </>
              ) : (
                t('actions.generate')
              )}
            </Button>

            {generatedImageUrl && (
              <Button
                type="button"
                variant="outline"
                onClick={reset}
                disabled={isBusy}
              >
                {t('actions.clear')}
              </Button>
            )}

            {uploadedMeta && !isBusy && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Check className="h-3.5 w-3.5" />
                {t('status.uploaded')}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl border bg-background/70 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{t('result.title')}</p>
                <p className="text-xs text-muted-foreground">
                  {t('result.subtitle')}
                </p>
              </div>
              {generatedImageUrl && (
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={openPreview}
                    aria-label={t('result.previewHint')}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" asChild>
                    <a
                      href={generatedImageUrl}
                      download
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
            </div>

            <div className="relative flex min-h-[320px] items-center justify-center rounded-lg border bg-muted/40">
              {isLoading ? (
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              ) : generatedImageUrl ? (
                <button
                  type="button"
                  className="group relative h-full w-full"
                  onClick={openPreview}
                  aria-label={t('result.previewHint')}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={generatedImageUrl}
                    alt={t('result.previewAlt')}
                    className="h-full w-full rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 hidden items-center justify-center bg-black/40 text-sm text-white group-hover:flex">
                    {t('result.previewCta')}
                  </div>
                </button>
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <ImageIcon className="h-10 w-10" />
                  <span className="text-sm">{t('result.empty')}</span>
                </div>
              )}
            </div>

            {revisedPrompt && (
              <div className="mt-4 rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  {t('result.revisedLabel')}
                </span>
                <span className="ml-2 break-words">{revisedPrompt}</span>
              </div>
            )}

            {activePrompt && (
              <div className="mt-2 text-xs text-muted-foreground">
                {t('result.currentPrompt', { prompt: activePrompt })}
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={previewIsOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-h-[90vh] max-w-[90vw] border-none bg-transparent p-0 shadow-none">
          {generatedImageUrl && (
            <div className="flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={generatedImageUrl}
                alt={t('result.previewAlt')}
                className="max-h-[80vh] w-full object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

