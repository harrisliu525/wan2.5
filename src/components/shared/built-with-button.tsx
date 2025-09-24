import { WanBadge } from '@/components/layout/logo-mksaas';
import { Button } from '@/components/ui/button';
import { Routes } from '@/routes';
import { ArrowUpRight } from 'lucide-react';

export function BuiltWithButton() {
  return (
    <Button asChild variant="outline" size="sm" className="gap-2">
      <a href={Routes.Docs}>
        <WanBadge className="size-auto" />
        <span className="font-semibold">wan-2.5.video</span>
        <span className="text-muted-foreground text-xs">
          wan-25.video | Specs, pricing, and field notes
        </span>
        <ArrowUpRight className="size-4" />
      </a>
    </Button>
  );
}
