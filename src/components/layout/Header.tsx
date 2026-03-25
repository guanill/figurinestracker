import { Moon, Sun, LayoutDashboard, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { SearchBar } from '../ui/SearchBar';
import { useCollectionContext } from '../../context/CollectionContext';
import type { Page } from '../../types';

interface HeaderProps {
  search: string;
  onSearchChange: (v: string) => void;
  onNavigate: (page: Page) => void;
}

export function Header({ search, onSearchChange, onNavigate }: HeaderProps) {
  const { state, updateSettings } = useCollectionContext();
  const isDark = state.settings.theme === 'dark';

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    updateSettings({ theme: newTheme });
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-dark-surface/80 backdrop-blur-lg border-b border-cream-dark dark:border-dark-border">
      <div className="flex items-center gap-2 sm:gap-4 px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3">
        {/* Logo */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate({ type: 'dashboard' })}
          className="flex items-center gap-2 cursor-pointer bg-transparent border-none"
        >
          <span className="text-2xl">🏠</span>
          <h1 className="text-xl font-bold text-pink-dark dark:text-pink m-0 hidden sm:block">
            Tiny Shelf
          </h1>
        </motion.button>

        {/* Search */}
        <SearchBar
          value={search}
          onChange={onSearchChange}
          className="flex-1 max-w-md"
        />

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onNavigate({ type: 'dashboard' })}
            className="p-2 rounded-xl hover:bg-cream-dark dark:hover:bg-dark-surface-hover transition-colors cursor-pointer text-warm-brown-light dark:text-dark-text-muted"
            title="Dashboard"
          >
            <LayoutDashboard size={20} />
          </button>
          <button
            onClick={() => onNavigate({ type: 'settings' })}
            className="p-2 rounded-xl hover:bg-cream-dark dark:hover:bg-dark-surface-hover transition-colors cursor-pointer text-warm-brown-light dark:text-dark-text-muted"
            title="Settings"
          >
            <Settings size={20} />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-cream-dark dark:hover:bg-dark-surface-hover transition-colors cursor-pointer text-warm-brown-light dark:text-dark-text-muted"
            title="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
