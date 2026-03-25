import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { Brand } from '../../types';

interface BrandFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, emoji: string) => void;
  onUpdate?: (id: string, updates: Partial<Brand>) => void;
  editBrand?: Brand | null;
}

export function BrandForm({ open, onClose, onSave, onUpdate, editBrand }: BrandFormProps) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('');

  useEffect(() => {
    if (editBrand) {
      setName(editBrand.name);
      setEmoji(editBrand.emoji);
    } else {
      setName('');
      setEmoji('');
    }
  }, [editBrand, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (editBrand && onUpdate) {
      onUpdate(editBrand.id, { name: name.trim(), emoji: emoji || '🎨' });
    } else {
      onSave(name.trim(), emoji || '🎨');
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={editBrand ? 'Edit Brand' : 'Add Brand'} width="max-w-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Brand Name"
          placeholder="e.g. Smiski"
          value={name}
          onChange={e => setName(e.target.value)}
          autoFocus
        />
        <Input
          label="Emoji"
          placeholder="e.g. 🌿"
          value={emoji}
          onChange={e => setEmoji(e.target.value)}
          maxLength={4}
        />
        <div className="flex gap-3 justify-end pt-2">
          <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={!name.trim()}>{editBrand ? 'Update' : 'Add Brand'}</Button>
        </div>
      </form>
    </Modal>
  );
}
