import { cn } from '../../lib/utils';
import type { FigurineStatus } from '../../types';

const statusStyles: Record<FigurineStatus, string> = {
  owned: 'bg-sage text-sage-dark dark:bg-sage-dark/30 dark:text-sage',
  wishlist: 'bg-lavender-light text-lavender-dark dark:bg-lavender-dark/30 dark:text-lavender',
  trading: 'bg-amber-light text-amber-dark dark:bg-amber-dark/30 dark:text-amber',
};

const statusLabels: Record<FigurineStatus, string> = {
  owned: 'Owned',
  wishlist: 'Wishlist',
  trading: 'Trading',
};

export function StatusBadge({ status, size = 'md', className }: { status: FigurineStatus; size?: 'sm' | 'md'; className?: string }) {
  return (
    <span className={cn(
      'rounded-full font-bold whitespace-nowrap',
      size === 'sm' ? 'px-1.5 py-0.5 text-[9px]' : 'px-2.5 py-0.5 text-xs',
      statusStyles[status],
      className,
    )}>
      {statusLabels[status]}
    </span>
  );
}
