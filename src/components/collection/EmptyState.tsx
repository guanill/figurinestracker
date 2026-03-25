import { PackageOpen } from 'lucide-react';
import { Button } from '../ui/Button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-pink-light dark:bg-pink-dark/20 flex items-center justify-center mb-4">
        <PackageOpen size={28} className="text-pink" />
      </div>
      <h3 className="text-lg font-bold text-warm-brown dark:text-dark-text mb-1">{title}</h3>
      <p className="text-sm text-warm-brown-light dark:text-dark-text-muted max-w-sm mb-4">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm">{actionLabel}</Button>
      )}
    </div>
  );
}
