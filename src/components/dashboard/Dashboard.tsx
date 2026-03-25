import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Package, Heart, ArrowRightLeft, Star, TrendingUp } from 'lucide-react';
import { useCollectionContext } from '../../context/CollectionContext';
import { ProgressRing } from '../ui/ProgressRing';
import { FigurineCard } from '../collection/FigurineCard';
import { cn } from '../../lib/utils';
import type { Page, Figurine } from '../../types';

interface DashboardProps {
  onNavigate: (page: Page) => void;
  onEditFigurine: (figurine: Figurine) => void;
  onDeleteFigurine: (id: string) => void;
}

export function Dashboard({ onNavigate, onEditFigurine, onDeleteFigurine }: DashboardProps) {
  const { state, toggleFavorite, setStatus } = useCollectionContext();

  const stats = useMemo(() => {
    const figs = state.figurines;
    return {
      total: figs.length,
      owned: figs.filter(f => f.status === 'owned').length,
      wishlist: figs.filter(f => f.status === 'wishlist').length,
      trading: figs.filter(f => f.status === 'trading').length,
      favorites: figs.filter(f => f.favorite).length,
    };
  }, [state.figurines]);

  const recentlyAdded = useMemo(
    () => [...state.figurines].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 8),
    [state.figurines],
  );

  const brandStats = useMemo(() => {
    return state.brands.map(brand => {
      const figs = state.figurines.filter(f => f.brandId === brand.id);
      const series = state.series.filter(s => s.brandId === brand.id);
      const owned = figs.filter(f => f.status === 'owned').length;
      const total = series.reduce((sum, s) => sum + (s.totalInSeries || 0), 0) || figs.length;
      return { brand, count: figs.length, owned, total, series: series.length };
    }).filter(b => b.count > 0).sort((a, b) => b.count - a.count);
  }, [state.brands, state.figurines, state.series]);

  const seriesCompletion = useMemo(() => {
    return state.series
      .map(series => {
        const brand = state.brands.find(b => b.id === series.brandId);
        const figs = state.figurines.filter(f => f.seriesId === series.id);
        const owned = figs.filter(f => f.status === 'owned').length;
        const total = series.totalInSeries || figs.length;
        return { series, brand, owned, total, percent: total > 0 ? owned / total : 0 };
      })
      .filter(s => s.owned > 0)
      .sort((a, b) => b.percent - a.percent)
      .slice(0, 8);
  }, [state.series, state.figurines, state.brands]);

  const statCards = [
    { label: 'Total', value: stats.total, icon: Package, color: 'bg-pink-light dark:bg-pink-dark/20 text-pink-dark dark:text-pink' },
    { label: 'Owned', value: stats.owned, icon: Star, color: 'bg-sage-light dark:bg-sage-dark/20 text-sage-dark dark:text-sage' },
    { label: 'Wishlist', value: stats.wishlist, icon: Heart, color: 'bg-lavender-light dark:bg-lavender-dark/20 text-lavender-dark dark:text-lavender' },
    { label: 'Trading', value: stats.trading, icon: ArrowRightLeft, color: 'bg-amber-light dark:bg-amber-dark/20 text-amber-dark dark:text-amber' },
  ];

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-warm-brown dark:text-dark-text m-0 mb-1">
          Welcome to Tiny Shelf
        </h1>
        <p className="text-warm-brown-light dark:text-dark-text-muted">
          Your cozy figurine collection tracker
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <motion.div
            key={label}
            whileHover={{ y: -2 }}
            className="bg-white dark:bg-dark-surface rounded-2xl p-4 shadow-sm"
          >
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-3', color)}>
              <Icon size={20} />
            </div>
            <div className="text-2xl font-bold text-warm-brown dark:text-dark-text">{value}</div>
            <div className="text-xs font-semibold text-warm-brown-light dark:text-dark-text-muted">{label}</div>
          </motion.div>
        ))}
      </div>

      {/* Two column layout */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Brand breakdown */}
        <div className="bg-white dark:bg-dark-surface rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-pink" />
            <h2 className="text-base font-bold text-warm-brown dark:text-dark-text m-0">Collection by Brand</h2>
          </div>
          {brandStats.length > 0 ? (
            <div className="flex flex-col gap-3">
              {brandStats.map(({ brand, count, owned, total }) => (
                <button
                  key={brand.id}
                  onClick={() => onNavigate({ type: 'brand', brandId: brand.id })}
                  className="flex items-center gap-3 cursor-pointer border-none bg-transparent text-left w-full group"
                >
                  <span className="text-lg">{brand.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-warm-brown dark:text-dark-text group-hover:text-pink transition-colors truncate">
                        {brand.name}
                      </span>
                      <span className="text-xs text-warm-brown-light dark:text-dark-text-muted">
                        {count} figurines
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-cream-dark dark:bg-dark-border mt-1 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-pink transition-all"
                        style={{ width: `${total > 0 ? (owned / total) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-warm-brown-light dark:text-dark-text-muted text-center py-4">
              Add figurines to see your brand breakdown
            </p>
          )}
        </div>

        {/* Series completion */}
        <div className="bg-white dark:bg-dark-surface rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Star size={18} className="text-amber" />
            <h2 className="text-base font-bold text-warm-brown dark:text-dark-text m-0">Series Progress</h2>
          </div>
          {seriesCompletion.length > 0 ? (
            <div className="flex flex-col gap-3">
              {seriesCompletion.map(({ series, brand, owned, total }) => (
                <div key={series.id} className="flex items-center gap-3">
                  <ProgressRing value={owned} max={total} size={40} strokeWidth={3} color={series.color} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-warm-brown dark:text-dark-text truncate">
                      {series.name}
                    </div>
                    <div className="text-xs text-warm-brown-light dark:text-dark-text-muted">
                      {brand?.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-warm-brown-light dark:text-dark-text-muted text-center py-4">
              Mark figurines as owned to track progress
            </p>
          )}
        </div>
      </div>

      {/* Recently added */}
      {recentlyAdded.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-bold text-warm-brown dark:text-dark-text mb-4 m-0">Recently Added</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {recentlyAdded.map(fig => (
              <FigurineCard
                key={fig.id}
                figurine={fig}
                onToggleFavorite={toggleFavorite}
                onSetStatus={setStatus}
                onEdit={onEditFigurine}
                onDelete={onDeleteFigurine}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty welcome */}
      {stats.total === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="text-xl font-bold text-warm-brown dark:text-dark-text mb-2">Your shelf is empty!</h2>
          <p className="text-sm text-warm-brown-light dark:text-dark-text-muted max-w-md mx-auto">
            Pick a brand from the sidebar and start adding figurines to your collection.
            We've pre-loaded popular brands and series for you!
          </p>
        </motion.div>
      )}
    </div>
  );
}
