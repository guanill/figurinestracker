import { cn } from '../../lib/utils';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-warm-brown dark:text-dark-text">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'px-3 py-2 rounded-xl border border-cream-dark bg-white text-warm-brown',
          'dark:border-dark-border dark:bg-dark-surface dark:text-dark-text',
          'focus:outline-none focus:ring-2 focus:ring-pink/40 focus:border-pink',
          'placeholder:text-warm-brown-light/50 dark:placeholder:text-dark-text-muted/50',
          'transition-all text-sm',
          className,
        )}
        {...props}
      />
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, options, className, id, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-warm-brown dark:text-dark-text">
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          'px-3 py-2 rounded-xl border border-cream-dark bg-white text-warm-brown',
          'dark:border-dark-border dark:bg-dark-surface dark:text-dark-text',
          'focus:outline-none focus:ring-2 focus:ring-pink/40 focus:border-pink',
          'transition-all text-sm cursor-pointer',
          className,
        )}
        {...props}
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function TextArea({ label, className, id, ...props }: TextAreaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-warm-brown dark:text-dark-text">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          'px-3 py-2 rounded-xl border border-cream-dark bg-white text-warm-brown',
          'dark:border-dark-border dark:bg-dark-surface dark:text-dark-text',
          'focus:outline-none focus:ring-2 focus:ring-pink/40 focus:border-pink',
          'placeholder:text-warm-brown-light/50 dark:placeholder:text-dark-text-muted/50',
          'transition-all text-sm resize-none',
          className,
        )}
        rows={3}
        {...props}
      />
    </div>
  );
}
