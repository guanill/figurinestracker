import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Filter, Check, Heart, ArrowRightLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCollectionContext } from '../../context/CollectionContext';
import { FigurineCard } from './FigurineCard';
import { CompletionBar } from './CompletionBar';
import { EmptyState } from './EmptyState';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import type { Figurine, Series, FigurineStatus } from '../../types';

interface BrandPageProps {
  brandId: string;
  searchQuery: string;
  onAddSeries: (brandId: string) => void;
  onEditSeries: (series: Series) => void;
  onDeleteSeries: (id: string) => void;
  onAddFigurine: (seriesId: string, brandId: string) => void;
  onEditFigurine: (figurine: Figurine) => void;
  onDeleteFigurine: (id: string) => void;
}

const filterOptions: { value: FigurineStatus | 'all'; label: string; icon: typeof Check }[] = [
  { value: 'all', label: 'All', icon: Filter },
  { value: 'owned', label: 'Owned', icon: Check },
  { value: 'wishlist', label: 'Want', icon: Heart },
  { value: 'trading', label: 'Trading', icon: ArrowRightLeft },
];

export function BrandPage({
  brandId,
  searchQuery,
  onAddSeries,
  onEditSeries: _onEditSeries,
  onDeleteSeries: _onDeleteSeries,
  onAddFigurine,
  onEditFigurine,
  onDeleteFigurine,
}: BrandPageProps) {
  const { state, toggleFavorite, setStatus } = useCollectionContext();
  const [statusFilter, setStatusFilter] = useState<FigurineStatus | 'all'>('all');
  const [selectedSeriesId, setSelectedSeriesId] = useState<string | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const brand = state.brands.find(b => b.id === brandId);
  const brandSeries = useMemo(
    () => state.series.filter(s => s.brandId === brandId).sort((a, b) => a.sortOrder - b.sortOrder),
    [state.series, brandId],
  );

  // Auto-select first series
  useEffect(() => {
    if (brandSeries.length > 0 && (!selectedSeriesId || !brandSeries.find(s => s.id === selectedSeriesId))) {
      setSelectedSeriesId(brandSeries[0].id);
    }
  }, [brandSeries, selectedSeriesId]);

  if (!brand) return <EmptyState title="Brand not found" description="This brand doesn't exist." />;

  const activeSeries = brandSeries.find(s => s.id === selectedSeriesId) || brandSeries[0];
  const allFigs = state.figurines.filter(f => f.brandId === brandId);
  const totalOwned = allFigs.filter(f => f.status === 'owned').length;
  const totalFigs = allFigs.length;
  // Figurines for active series
  const seriesFigs = state.figurines.filter(f => f.seriesId === activeSeries?.id);
  let filtered = seriesFigs;
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(f => f.name.toLowerCase().includes(q) || f.notes.toLowerCase().includes(q));
  }
  if (statusFilter !== 'all') {
    filtered = filtered.filter(f => f.status === statusFilter);
  }
  filtered = [...filtered].sort((a, b) => {
    if (a.favorite !== b.favorite) return a.favorite ? -1 : 1;
    if (a.status === 'owned' && b.status !== 'owned') return -1;
    if (a.status !== 'owned' && b.status === 'owned') return 1;
    return a.name.localeCompare(b.name);
  });

  const seriesOwned = seriesFigs.filter(f => f.status === 'owned').length;
  const seriesTotal = activeSeries?.totalInSeries || seriesFigs.length;

  const activeIndex = brandSeries.findIndex(s => s.id === activeSeries?.id);

  const goToSeries = (dir: 'prev' | 'next') => {
    const newIndex = dir === 'prev'
      ? (activeIndex - 1 + brandSeries.length) % brandSeries.length
      : (activeIndex + 1) % brandSeries.length;
    setSelectedSeriesId(brandSeries[newIndex].id);
  };

  // Scroll selected tab into view
  useEffect(() => {
    if (!tabsRef.current || !selectedSeriesId) return;
    const tab = tabsRef.current.querySelector(`[data-series="${selectedSeriesId}"]`) as HTMLElement;
    if (tab) {
      tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selectedSeriesId]);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Top bar: brand name + global progress */}
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
        <span className="text-xl sm:text-2xl">{brand.emoji}</span>
        <h1 className="text-base sm:text-lg font-bold text-warm-brown dark:text-dark-text m-0">{brand.name}</h1>
        <div className="flex-1 max-w-32 sm:max-w-48">
          <CompletionBar owned={totalOwned} total={totalFigs} color="#E8A0BF" />
        </div>
        <Button size="sm" variant="ghost" onClick={() => onAddSeries(brandId)}>
          <Plus size={14} />
        </Button>
      </div>

      {/* Series icon carousel */}
      {activeSeries && (
        <div className="relative mb-4 group/tabs">
          {/* Prev/Next arrows — always visible on mobile for touch */}
          <button
            onClick={() => goToSeries('prev')}
            className="absolute -left-1 sm:-left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-dark-surface shadow-lg flex items-center justify-center cursor-pointer border border-cream-dark dark:border-dark-border text-warm-brown-light hover:text-pink transition-colors sm:opacity-0 sm:group-hover/tabs:opacity-100"
          >
            <ChevronLeft size={14} />
          </button>

          {/* Scrollable icon strip */}
          <div
            ref={tabsRef}
            className="flex gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar px-6 sm:px-1 py-1"
          >
            {brandSeries.map(series => {
              const isActive = series.id === activeSeries?.id;
              return (
                <button
                  key={series.id}
                  data-series={series.id}
                  onClick={() => setSelectedSeriesId(series.id)}
                  className={cn(
                    'shrink-0 relative rounded-xl sm:rounded-2xl cursor-pointer transition-all overflow-hidden',
                    isActive
                      ? 'ring-3 ring-pink shadow-lg scale-105'
                      : 'opacity-60 hover:opacity-90 hover:shadow-md grayscale-30 hover:grayscale-0',
                  )}
                  style={{ width: 80, height: 80 }}
                >
                  {series.tabIconUrl ? (
                    <img
                      src={series.tabIconUrl}
                      alt={series.name}
                      className="w-full h-full object-contain rounded-xl sm:rounded-2xl"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-full h-full rounded-xl sm:rounded-2xl flex items-center justify-center text-[10px] sm:text-xs font-bold text-white"
                      style={{ backgroundColor: series.color }}
                    >
                      {series.name}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => goToSeries('next')}
            className="absolute -right-1 sm:-right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-dark-surface shadow-lg flex items-center justify-center cursor-pointer border border-cream-dark dark:border-dark-border text-warm-brown-light hover:text-pink transition-colors sm:opacity-0 sm:group-hover/tabs:opacity-100"
          >
            <ChevronRight size={14} />
          </button>

          {/* Series counter */}
          <div className="text-center mt-1.5">
            <span className="text-[10px] sm:text-[11px] font-bold text-warm-brown-light dark:text-dark-text-muted">
              {activeIndex + 1} / {brandSeries.length} series
            </span>
          </div>
        </div>
      )}

      {/* Active series content */}
      {activeSeries && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSeries.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {/* Series info bar: name, year, progress, artwork */}
            <div
              className="flex rounded-2xl sm:rounded-3xl overflow-hidden mb-4 sm:mb-5 shadow-lg h-28 sm:h-36"
              style={{ backgroundColor: activeSeries.color + '20' }}
            >
              <div className="flex-1 min-w-0 flex flex-col justify-center px-4 sm:px-5 py-2.5 sm:py-3">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shrink-0" style={{ backgroundColor: activeSeries.color }} />
                  {activeSeries.releaseYear && (
                    <span className="text-[10px] sm:text-[11px] font-bold text-warm-brown-light dark:text-dark-text-muted">
                      {activeSeries.releaseYear}
                    </span>
                  )}
                </div>
                <h2 className="text-base sm:text-xl font-bold text-warm-brown dark:text-dark-text m-0 mb-1 sm:mb-1.5 truncate">
                  {activeSeries.name}
                </h2>
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="flex-1 max-w-32 sm:max-w-44">
                    <CompletionBar owned={seriesOwned} total={seriesTotal} color={activeSeries.color} />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-warm-brown-light dark:text-dark-text-muted whitespace-nowrap">
                    {seriesOwned}/{seriesTotal}
                  </span>
                  {seriesOwned === seriesTotal && seriesTotal > 0 && (
                    <span className="hidden sm:inline px-2 py-0.5 rounded-full text-[10px] font-bold bg-sage text-white">
                      Complete!
                    </span>
                  )}
                </div>
              </div>
              {activeSeries.artworkUrl && (
                <div className="shrink-0 w-28 sm:w-52 h-full">
                  <img
                    src={activeSeries.artworkUrl}
                    alt={`${activeSeries.name} artwork`}
                    className={cn(
                      'w-full h-full',
                      activeSeries.artworkUrl.endsWith('.jpg') ? 'object-cover' : 'object-contain',
                    )}
                    loading="eager"
                  />
                </div>
              )}
            </div>

            {/* Filters row */}
            <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4 flex-wrap">
              <div className="flex items-center gap-1">
                {filterOptions.map(opt => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setStatusFilter(opt.value)}
                      className={cn(
                        'flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-[11px] font-bold cursor-pointer border-none transition-all',
                        statusFilter === opt.value
                          ? 'text-white shadow-sm'
                          : 'bg-white dark:bg-dark-surface text-warm-brown-light dark:text-dark-text-muted hover:bg-pink-light dark:hover:bg-dark-surface-hover',
                      )}
                      style={statusFilter === opt.value ? { backgroundColor: activeSeries.color } : undefined}
                    >
                      <Icon size={11} />
                      <span className="hidden sm:inline">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => onAddFigurine(activeSeries.id, brandId)}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold cursor-pointer border-none bg-pink-light text-pink-dark hover:bg-pink hover:text-white dark:bg-pink-dark/20 dark:text-pink dark:hover:bg-pink-dark/40 transition-colors"
              >
                <Plus size={12} /> <span className="hidden sm:inline">Add figurine</span><span className="sm:hidden">Add</span>
              </button>
            </div>

            {/* Figurines grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3">
                {filtered.map(fig => (
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
            ) : (
              <EmptyState
                title={searchQuery ? 'No matches' : 'No figurines yet'}
                description={searchQuery ? 'Try a different search term' : `Start tracking your ${activeSeries.name} collection!`}
                actionLabel={searchQuery ? undefined : 'Add Figurine'}
                onAction={searchQuery ? undefined : () => onAddFigurine(activeSeries.id, brandId)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {brandSeries.length === 0 && (
        <EmptyState
          title="No series yet"
          description={`Add your first ${brand.name} series to start tracking!`}
          actionLabel="Add Series"
          onAction={() => onAddSeries(brandId)}
        />
      )}
    </div>
  );
}
