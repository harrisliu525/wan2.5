import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'text-lg font-semibold tracking-tight uppercase text-foreground',
        className
      )}
    >
      wan-2.5.video
    </span>
  );
}
