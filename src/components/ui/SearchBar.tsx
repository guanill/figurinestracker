import { Search, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search your collection...', className }: SearchBarProps) {
  return (
    <div className={cn('relative', className)}>
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-brown-light dark:text-dark-text-muted" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full pl-9 pr-8 py-2 rounded-xl border border-cream-dark bg-white text-sm text-warm-brown',
          'dark:border-dark-border dark:bg-dark-surface dark:text-dark-text',
          'focus:outline-none focus:ring-2 focus:ring-pink/40 focus:border-pink',
          'placeholder:text-warm-brown-light/50 dark:placeholder:text-dark-text-muted/50',
          'transition-all',
        )}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-warm-brown-light dark:text-dark-text-muted hover:text-warm-brown cursor-pointer"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
