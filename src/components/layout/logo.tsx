import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center', className)}>
      <Image
        src="/logo.png"
        alt="wan-2.5.video logo"
        width={32}
        height={32}
        className="h-8 w-8"
        priority
      />
      <span className="sr-only">wan-2.5.video</span>
    </span>
  );
}
