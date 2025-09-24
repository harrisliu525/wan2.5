import { cn } from '@/lib/utils';

export function WanBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-md border border-primary/40 bg-primary/10 px-2 py-1 text-xs font-semibold uppercase tracking-widest text-primary',
        className
      )}
    >
      WAN 2.5
    </span>
  );
}
