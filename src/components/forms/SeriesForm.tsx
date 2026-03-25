import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { Series } from '../../types';

interface SeriesFormProps {
  open: boolean;
  onClose: () => void;
  brandId: string;
  onSave: (brandId: string, name: string, totalInSeries?: number, releaseYear?: number) => void;
  onUpdate?: (id: string, updates: Partial<Series>) => void;
  editSeries?: Series | null;
}

export function SeriesForm({ open, onClose, brandId, onSave, onUpdate, editSeries }: SeriesFormProps) {
  const [name, setName] = useState('');
  const [total, setTotal] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    if (editSeries) {
      setName(editSeries.name);
      setTotal(editSeries.totalInSeries?.toString() || '');
      setYear(editSeries.releaseYear?.toString() || '');
    } else {
      setName('');
      setTotal('');
      setYear('');
    }
  }, [editSeries, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const t = total ? parseInt(total) : undefined;
    const y = year ? parseInt(year) : undefined;
    if (editSeries && onUpdate) {
      onUpdate(editSeries.id, { name: name.trim(), totalInSeries: t, releaseYear: y });
    } else {
      onSave(brandId, name.trim(), t, y);
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={editSeries ? 'Edit Series' : 'Add Series'} width="max-w-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Series Name"
          placeholder="e.g. Living, Bath, Yoga..."
          value={name}
          onChange={e => setName(e.target.value)}
          autoFocus
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Total in Series"
            type="number"
            placeholder="e.g. 6"
            value={total}
            onChange={e => setTotal(e.target.value)}
            min={1}
          />
          <Input
            label="Release Year"
            type="number"
            placeholder="e.g. 2023"
            value={year}
            onChange={e => setYear(e.target.value)}
            min={2000}
            max={2030}
          />
        </div>
        <div className="flex gap-3 justify-end pt-2">
          <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={!name.trim()}>{editSeries ? 'Update' : 'Add Series'}</Button>
        </div>
      </form>
    </Modal>
  );
}
