import { Plus, ChevronRight, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCollectionContext } from '../../context/CollectionContext';
import { cn } from '../../lib/utils';
import type { Page } from '../../types';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onAddBrand: () => void;
}

export function Sidebar({ currentPage, onNavigate, onAddBrand }: SidebarProps) {
  const { state } = useCollectionContext();
  const sortedBrands = [...state.brands].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-[calc(100vh-57px)] border-r border-cream-dark dark:border-dark-border bg-white/50 dark:bg-dark-surface/50">
      <div className="p-4">
        {/* Dashboard link */}
        <motion.button
          whileHover={{ x: 2 }}
          onClick={() => onNavigate({ type: 'dashboard' })}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer border-none w-full mb-3',
            currentPage.type === 'dashboard'
              ? 'bg-pink-light dark:bg-pink-dark/20 text-warm-brown dark:text-dark-text'
              : 'text-warm-brown-light dark:text-dark-text-muted hover:bg-cream-dark dark:hover:bg-dark-surface-hover',
          )}
        >
          <LayoutDashboard size={18} />
          <span className="font-semibold text-sm">Dashboard</span>
        </motion.button>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-warm-brown-light dark:text-dark-text-muted">
            Brands
          </span>
          <button
            onClick={onAddBrand}
            className="p-1 rounded-lg hover:bg-cream-dark dark:hover:bg-dark-surface-hover transition-colors cursor-pointer text-warm-brown-light dark:text-dark-text-muted"
            title="Add brand"
          >
            <Plus size={16} />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {sortedBrands.map(brand => {
            const isActive = currentPage.type === 'brand' && currentPage.brandId === brand.id;
            const brandFigs = state.figurines.filter(f => f.brandId === brand.id);
            const ownedCount = brandFigs.filter(f => f.status === 'owned').length;
            const totalCount = brandFigs.length;

            return (
              <motion.button
                key={brand.id}
                whileHover={{ x: 2 }}
                onClick={() => onNavigate({ type: 'brand', brandId: brand.id })}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer border-none w-full',
                  isActive
                    ? 'bg-pink-light dark:bg-pink-dark/20 text-warm-brown dark:text-dark-text'
                    : 'text-warm-brown-light dark:text-dark-text-muted hover:bg-cream-dark dark:hover:bg-dark-surface-hover',
                )}
              >
                <span className="text-lg">{brand.emoji}</span>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-sm truncate block">{brand.name}</span>
                  <span className="text-xs opacity-70">{ownedCount}/{totalCount} owned</span>
                </div>
                <ChevronRight size={14} className={cn(
                  'transition-transform',
                  isActive && 'text-pink dark:text-pink',
                )} />
              </motion.button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
