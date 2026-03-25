import { LayoutDashboard, Grid3x3, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useCollectionContext } from '../../context/CollectionContext';
import type { Page } from '../../types';
import { useState } from 'react';

interface MobileNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function MobileNav({ currentPage, onNavigate }: MobileNavProps) {
  const { state } = useCollectionContext();
  const [showBrands, setShowBrands] = useState(false);
  const sortedBrands = [...state.brands].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      {/* Brand drawer */}
      {showBrands && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowBrands(false)} />
          <div className="absolute bottom-16 left-0 right-0 bg-white dark:bg-dark-surface rounded-t-2xl p-4 max-h-[60vh] overflow-y-auto">
            <div className="text-xs font-bold uppercase tracking-wider text-warm-brown-light dark:text-dark-text-muted mb-3">
              Select Brand
            </div>
            <div className="grid grid-cols-2 gap-2">
              {sortedBrands.map(brand => (
                <button
                  key={brand.id}
                  onClick={() => { onNavigate({ type: 'brand', brandId: brand.id }); setShowBrands(false); }}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2.5 rounded-xl text-left cursor-pointer border-none transition-colors',
                    currentPage.type === 'brand' && currentPage.brandId === brand.id
                      ? 'bg-pink-light dark:bg-pink-dark/20 text-warm-brown dark:text-dark-text'
                      : 'bg-cream-dark dark:bg-dark-surface-hover text-warm-brown-light dark:text-dark-text-muted',
                  )}
                >
                  <span>{brand.emoji}</span>
                  <span className="text-sm font-semibold truncate">{brand.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/90 dark:bg-dark-surface/90 backdrop-blur-lg border-t border-cream-dark dark:border-dark-border">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={() => onNavigate({ type: 'dashboard' })}
            className={cn(
              'flex flex-col items-center gap-0.5 px-4 py-1 cursor-pointer border-none bg-transparent',
              currentPage.type === 'dashboard' ? 'text-pink dark:text-pink' : 'text-warm-brown-light dark:text-dark-text-muted',
            )}
          >
            <LayoutDashboard size={20} />
            <span className="text-[10px] font-semibold">Home</span>
          </button>
          <button
            onClick={() => setShowBrands(true)}
            className={cn(
              'flex flex-col items-center gap-0.5 px-4 py-1 cursor-pointer border-none bg-transparent',
              currentPage.type === 'brand' ? 'text-pink dark:text-pink' : 'text-warm-brown-light dark:text-dark-text-muted',
            )}
          >
            <Grid3x3 size={20} />
            <span className="text-[10px] font-semibold">Brands</span>
          </button>
          <button
            onClick={() => onNavigate({ type: 'settings' })}
            className={cn(
              'flex flex-col items-center gap-0.5 px-4 py-1 cursor-pointer border-none bg-transparent',
              currentPage.type === 'settings' ? 'text-pink dark:text-pink' : 'text-warm-brown-light dark:text-dark-text-muted',
            )}
          >
            <Settings size={20} />
            <span className="text-[10px] font-semibold">Settings</span>
          </button>
        </div>
      </nav>
    </>
  );
}
