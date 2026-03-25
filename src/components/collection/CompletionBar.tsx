import { cn } from '../../lib/utils';

interface CompletionBarProps {
  owned: number;
  total: number;
  color?: string;
}

export function CompletionBar({ owned, total, color = '#E8A0BF' }: CompletionBarProps) {
  const percent = total > 0 ? Math.round((owned / total) * 100) : 0;

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 rounded-full bg-cream-dark dark:bg-dark-border overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-500')}
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-bold text-warm-brown-light dark:text-dark-text-muted whitespace-nowrap">
        {owned}/{total} ({percent}%)
      </span>
    </div>
  );
}
