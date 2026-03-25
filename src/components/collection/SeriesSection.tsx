import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronDown, ChevronRight, Pencil, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { CompletionBar } from './CompletionBar';
import { FigurineCard } from './FigurineCard';
import { EmptyState } from './EmptyState';
import type { Series, Figurine, FigurineStatus } from '../../types';

interface SeriesSectionProps {
  series: Series;
  figurines: Figurine[];
  searchQuery: string;
  onAddFigurine: (seriesId: string) => void;
  onEditFigurine: (figurine: Figurine) => void;
  onDeleteFigurine: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onSetStatus: (id: string, status: FigurineStatus) => void;
  onEditSeries: (series: Series) => void;
  onDeleteSeries: (id: string) => void;
  statusFilter: FigurineStatus | 'all';
}

export function SeriesSection({
  series,
  figurines,
  searchQuery,
  onAddFigurine,
  onEditFigurine,
  onDeleteFigurine,
  onToggleFavorite,
  onSetStatus,
  onEditSeries,
  onDeleteSeries,
  statusFilter,
}: SeriesSectionProps) {
  const [collapsed, setCollapsed] = useState(false);

  let filtered = figurines;
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(f => f.name.toLowerCase().includes(q) || f.notes.toLowerCase().includes(q));
  }
  if (statusFilter !== 'all') {
    filtered = filtered.filter(f => f.status === statusFilter);
  }

  // Sort: favorites first, owned first, then by name
  filtered = [...filtered].sort((a, b) => {
    if (a.favorite !== b.favorite) return a.favorite ? -1 : 1;
    if (a.status === 'owned' && b.status !== 'owned') return -1;
    if (a.status !== 'owned' && b.status === 'owned') return 1;
    return a.name.localeCompare(b.name);
  });

  const ownedCount = figurines.filter(f => f.status === 'owned').length;
  const total = series.totalInSeries || figurines.length;

  // If search is active and no results, hide this section
  if (searchQuery && filtered.length === 0) return null;

  return (
    <section className="mb-8">
      {/* Series header */}
      <div
        className={cn(
          'flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors mb-3',
          'bg-white dark:bg-dark-surface hover:bg-white/80 dark:hover:bg-dark-surface-hover shadow-sm',
        )}
        onClick={() => setCollapsed(!collapsed)}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
          style={{ backgroundColor: series.color }}
        >
          {ownedCount}/{total}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold m-0 text-warm-brown dark:text-dark-text">
              {series.name}
            </h3>
            {series.releaseYear && (
              <span className="text-xs text-warm-brown-light dark:text-dark-text-muted">
                ({series.releaseYear})
              </span>
            )}
          </div>
          <div className="mt-1">
            <CompletionBar owned={ownedCount} total={total} color={series.color} />
          </div>
        </div>

        <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
          <button
            onClick={() => onEditSeries(series)}
            className="p-1.5 rounded-lg hover:bg-cream-dark dark:hover:bg-dark-border transition-colors cursor-pointer text-warm-brown-light dark:text-dark-text-muted opacity-0 group-hover:opacity-100"
            title="Edit series"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => onDeleteSeries(series.id)}
            className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer text-warm-brown-light dark:text-dark-text-muted hover:text-red-500 opacity-0 group-hover:opacity-100"
            title="Delete series"
          >
            <Trash2 size={13} />
          </button>
          <button
            onClick={() => onAddFigurine(series.id)}
            className={cn(
              'flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer border-none transition-colors',
              'bg-pink-light text-pink-dark hover:bg-pink hover:text-white dark:bg-pink-dark/20 dark:text-pink dark:hover:bg-pink-dark/40',
            )}
          >
            <Plus size={12} />
          </button>
        </div>

        {collapsed ? <ChevronRight size={18} className="text-warm-brown-light dark:text-dark-text-muted" /> : <ChevronDown size={18} className="text-warm-brown-light dark:text-dark-text-muted" />}
      </div>

      {/* Figurine grid */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {filtered.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 pl-2">
                {filtered.map(fig => (
                  <FigurineCard
                    key={fig.id}
                    figurine={fig}
                    onToggleFavorite={onToggleFavorite}
                    onSetStatus={onSetStatus}
                    onEdit={onEditFigurine}
                    onDelete={onDeleteFigurine}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No figurines yet"
                description={`Start tracking your ${series.name} collection!`}
                actionLabel="Add Figurine"
                onAction={() => onAddFigurine(series.id)}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
