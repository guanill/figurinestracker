import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const variants = {
  primary: 'bg-pink text-white hover:bg-pink-dark shadow-sm',
  secondary: 'bg-cream-dark text-warm-brown hover:bg-pink-light dark:bg-dark-surface dark:text-dark-text dark:hover:bg-dark-surface-hover',
  ghost: 'text-warm-brown-light hover:bg-cream-dark dark:text-dark-text-muted dark:hover:bg-dark-surface',
  danger: 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'rounded-xl font-semibold transition-colors cursor-pointer inline-flex items-center justify-center gap-2',
        variants[variant],
        sizes[size],
        props.disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
      {...props as any}
    >
      {children}
    </motion.button>
  );
}
