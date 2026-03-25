import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Input, Select, TextArea } from '../ui/Input';
import { Button } from '../ui/Button';
import type { Figurine, FigurineStatus, FigurineVariant } from '../../types';

interface FigurineFormProps {
  open: boolean;
  onClose: () => void;
  seriesId: string;
  brandId: string;
  onSave: (data: Pick<Figurine, 'brandId' | 'seriesId' | 'name' | 'status' | 'variant' | 'imageUrl' | 'notes' | 'acquiredDate' | 'tradingFor'>) => void;
  onUpdate?: (id: string, updates: Partial<Figurine>) => void;
  editFigurine?: Figurine | null;
}

const statusOptions = [
  { value: 'owned', label: 'Owned' },
  { value: 'wishlist', label: 'Wishlist' },
  { value: 'trading', label: 'Trading' },
];

const variantOptions = [
  { value: 'regular', label: 'Regular' },
  { value: 'secret', label: 'Secret' },
  { value: 'limited', label: 'Limited Edition' },
  { value: 'chase', label: 'Chase' },
];

export function FigurineForm({ open, onClose, seriesId, brandId, onSave, onUpdate, editFigurine }: FigurineFormProps) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<FigurineStatus>('owned');
  const [variant, setVariant] = useState<FigurineVariant>('regular');
  const [imageUrl, setImageUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [acquiredDate, setAcquiredDate] = useState('');
  const [tradingFor, setTradingFor] = useState('');

  useEffect(() => {
    if (editFigurine) {
      setName(editFigurine.name);
      setStatus(editFigurine.status);
      setVariant(editFigurine.variant);
      setImageUrl(editFigurine.imageUrl);
      setNotes(editFigurine.notes);
      setAcquiredDate(editFigurine.acquiredDate);
      setTradingFor(editFigurine.tradingFor);
    } else {
      setName('');
      setStatus('owned');
      setVariant('regular');
      setImageUrl('');
      setNotes('');
      setAcquiredDate('');
      setTradingFor('');
    }
  }, [editFigurine, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const data = {
      brandId: editFigurine?.brandId || brandId,
      seriesId: editFigurine?.seriesId || seriesId,
      name: name.trim(),
      status,
      variant,
      imageUrl: imageUrl.trim(),
      notes: notes.trim(),
      acquiredDate,
      tradingFor: tradingFor.trim(),
    };
    if (editFigurine && onUpdate) {
      onUpdate(editFigurine.id, data);
    } else {
      onSave(data);
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={editFigurine ? 'Edit Figurine' : 'Add Figurine'}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Name"
          placeholder="e.g. Smiski Stretching"
          value={name}
          onChange={e => setName(e.target.value)}
          autoFocus
        />
        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Status"
            options={statusOptions}
            value={status}
            onChange={e => setStatus(e.target.value as FigurineStatus)}
          />
          <Select
            label="Variant"
            options={variantOptions}
            value={variant}
            onChange={e => setVariant(e.target.value as FigurineVariant)}
          />
        </div>
        <Input
          label="Image URL"
          type="url"
          placeholder="https://..."
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />
        {imageUrl && (
          <div className="w-20 h-24 rounded-lg overflow-hidden bg-cream-dark dark:bg-dark-border">
            <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Acquired Date"
            type="date"
            value={acquiredDate}
            onChange={e => setAcquiredDate(e.target.value)}
          />
          {status === 'trading' && (
            <Input
              label="Trading For"
              placeholder="What do you want?"
              value={tradingFor}
              onChange={e => setTradingFor(e.target.value)}
            />
          )}
        </div>
        <TextArea
          label="Notes"
          placeholder="Any notes about this figurine..."
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
        <div className="flex gap-3 justify-end pt-2">
          <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={!name.trim()}>{editFigurine ? 'Update' : 'Add Figurine'}</Button>
        </div>
      </form>
    </Modal>
  );
}
