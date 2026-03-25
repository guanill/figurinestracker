import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MoreVertical, Pencil, Trash2, ArrowRightLeft, ImageOff, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { StatusBadge } from '../ui/StatusBadge';
import type { Figurine, FigurineStatus } from '../../types';

interface FigurineCardProps {
  figurine: Figurine;
  onToggleFavorite: (id: string) => void;
  onSetStatus: (id: string, status: FigurineStatus) => void;
  onEdit: (figurine: Figurine) => void;
  onDelete: (id: string) => void;
}

export const FigurineCard = memo(function FigurineCard({
  figurine,
  onToggleFavorite,
  onSetStatus,
  onEdit,
  onDelete,
}: FigurineCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [justToggled, setJustToggled] = useState(false);

  const toggleOwned = () => {
    const newStatus = figurine.status === 'owned' ? 'wishlist' : 'owned';
    onSetStatus(figurine.id, newStatus);
    if (newStatus === 'owned') {
      setJustToggled(true);
      setTimeout(() => setJustToggled(false), 600);
    }
  };

  const isOwned = figurine.status === 'owned';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className={cn(
        'relative group bg-white dark:bg-dark-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border-2',
        isOwned && 'border-sage dark:border-sage-dark/60',
        figurine.status === 'wishlist' && 'border-transparent opacity-60 hover:opacity-100',
        figurine.status === 'trading' && 'border-amber/50 dark:border-amber-dark/30',
      )}
    >
      {/* Image */}
      <div
        className="relative aspect-square bg-cream-dark/50 dark:bg-dark-border cursor-pointer overflow-hidden"
        onClick={toggleOwned}
      >
        {figurine.imageUrl ? (
          <img
            src={figurine.imageUrl}
            alt={figurine.name}
            className={cn(
              'w-full h-full object-contain p-2 transition-all duration-300',
              !isOwned && 'grayscale-[0.3]',
            )}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-warm-brown-light/30 dark:text-dark-text-muted/30">
            <ImageOff size={32} />
            <span className="text-xs mt-1">No image</span>
          </div>
        )}

        {/* Owned checkmark overlay */}
        <AnimatePresence>
          {isOwned && (
            <motion.div
              initial={justToggled ? { scale: 0 } : { scale: 1 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-sage dark:bg-sage-dark flex items-center justify-center shadow-sm"
            >
              <Check size={16} className="text-white" strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sparkle animation on toggle */}
        <AnimatePresence>
          {justToggled && (
            <motion.div
              initial={{ opacity: 1, scale: 0.5 }}
              animate={{ opacity: 0, scale: 2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-16 h-16 rounded-full bg-sage/30" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Favorite button */}
        <button
          onClick={e => { e.stopPropagation(); onToggleFavorite(figurine.id); }}
          className={cn(
            'absolute top-2 left-2 p-1.5 rounded-full transition-all cursor-pointer',
            figurine.favorite
              ? 'bg-pink text-white shadow-sm'
              : 'bg-white/70 dark:bg-dark-surface/70 text-warm-brown-light dark:text-dark-text-muted sm:opacity-0 sm:group-hover:opacity-100',
          )}
        >
          <Heart size={14} fill={figurine.favorite ? 'currentColor' : 'none'} />
        </button>

        {/* Menu button */}
        <div className="absolute bottom-2 right-2">
          <button
            onClick={e => { e.stopPropagation(); setShowMenu(!showMenu); }}
            className="p-1.5 rounded-full bg-white/70 dark:bg-dark-surface/70 text-warm-brown-light dark:text-dark-text-muted sm:opacity-0 sm:group-hover:opacity-100 transition-all cursor-pointer"
          >
            <MoreVertical size={14} />
          </button>
          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 bottom-8 z-20 bg-white dark:bg-dark-surface rounded-xl shadow-lg border border-cream-dark dark:border-dark-border py-1 min-w-[140px]">
                <button
                  onClick={() => { onSetStatus(figurine.id, 'owned'); setShowMenu(false); }}
                  className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-warm-brown dark:text-dark-text hover:bg-cream-dark dark:hover:bg-dark-surface-hover cursor-pointer border-none bg-transparent text-left"
                >
                  <Check size={13} className="text-sage-dark" /> Owned
                </button>
                <button
                  onClick={() => { onSetStatus(figurine.id, 'wishlist'); setShowMenu(false); }}
                  className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-warm-brown dark:text-dark-text hover:bg-cream-dark dark:hover:bg-dark-surface-hover cursor-pointer border-none bg-transparent text-left"
                >
                  <Heart size={13} className="text-lavender-dark" /> Wishlist
                </button>
                <button
                  onClick={() => { onSetStatus(figurine.id, 'trading'); setShowMenu(false); }}
                  className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-warm-brown dark:text-dark-text hover:bg-cream-dark dark:hover:bg-dark-surface-hover cursor-pointer border-none bg-transparent text-left"
                >
                  <ArrowRightLeft size={13} className="text-amber-dark" /> Trading
                </button>
                <div className="border-t border-cream-dark dark:border-dark-border my-1" />
                <button
                  onClick={() => { onEdit(figurine); setShowMenu(false); }}
                  className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-warm-brown dark:text-dark-text hover:bg-cream-dark dark:hover:bg-dark-surface-hover cursor-pointer border-none bg-transparent text-left"
                >
                  <Pencil size={13} /> Edit
                </button>
                <button
                  onClick={() => { onDelete(figurine.id); setShowMenu(false); }}
                  className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer border-none bg-transparent text-left"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </>
          )}
        </div>

        {/* Variant badge */}
        {figurine.variant !== 'regular' && (
          <span className={cn(
            'absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase',
            figurine.variant === 'secret' && 'bg-purple-500 text-white',
            figurine.variant === 'limited' && 'bg-amber text-warm-brown',
            figurine.variant === 'chase' && 'bg-pink text-white',
          )}>
            {figurine.variant}
          </span>
        )}

        {/* Trading indicator */}
        {figurine.status === 'trading' && (
          <span className="absolute top-2 right-2 p-1 rounded-full bg-amber text-warm-brown">
            <ArrowRightLeft size={12} />
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5">
        <div className="flex items-center justify-between gap-1">
          <h3 className="text-xs font-bold text-warm-brown dark:text-dark-text truncate m-0 leading-snug">
            {figurine.name}
          </h3>
          <StatusBadge status={figurine.status} size="sm" />
        </div>
      </div>
    </motion.div>
  );
});
