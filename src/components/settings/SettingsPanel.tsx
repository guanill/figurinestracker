import { useRef } from 'react';
import { Download, Upload, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCollectionContext } from '../../context/CollectionContext';
import { exportData, importData, getStorageUsage } from '../../lib/storage';
import { useToast } from '../ui/Toast';
import { useState } from 'react';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { DEFAULT_STATE } from '../../data/presets';

export function SettingsPanel() {
  const { state, importState } = useCollectionContext();
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [showReset, setShowReset] = useState(false);

  const handleExport = () => {
    const json = exportData(state);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tinyshelf-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast('Collection exported!');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = importData(reader.result as string);
      if (result) {
        importState(result);
        toast('Collection imported successfully!');
      } else {
        toast('Invalid file format', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    importState({ ...DEFAULT_STATE });
    toast('Collection reset to defaults');
  };

  const storageKB = Math.round(getStorageUsage() / 1024);

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-warm-brown dark:text-dark-text m-0 mb-6">Settings</h1>

      {/* Storage */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl p-5 shadow-sm mb-4">
        <h3 className="text-sm font-bold text-warm-brown dark:text-dark-text mb-1 m-0">Storage</h3>
        <p className="text-xs text-warm-brown-light dark:text-dark-text-muted mb-3">
          Using {storageKB} KB of ~5,000 KB available
        </p>
        <div className="h-2 rounded-full bg-cream-dark dark:bg-dark-border overflow-hidden mb-1">
          <div
            className="h-full rounded-full bg-pink transition-all"
            style={{ width: `${Math.min((storageKB / 5000) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Import/Export */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl p-5 shadow-sm mb-4">
        <h3 className="text-sm font-bold text-warm-brown dark:text-dark-text mb-3 m-0">Backup & Restore</h3>
        <div className="flex gap-3">
          <Button variant="secondary" size="sm" onClick={handleExport}>
            <Download size={16} /> Export JSON
          </Button>
          <Button variant="secondary" size="sm" onClick={() => fileRef.current?.click()}>
            <Upload size={16} /> Import JSON
          </Button>
          <input ref={fileRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl p-5 shadow-sm mb-4">
        <h3 className="text-sm font-bold text-warm-brown dark:text-dark-text mb-3 m-0">Collection Stats</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-warm-brown-light dark:text-dark-text-muted">Brands</div>
          <div className="font-bold text-warm-brown dark:text-dark-text">{state.brands.length}</div>
          <div className="text-warm-brown-light dark:text-dark-text-muted">Series</div>
          <div className="font-bold text-warm-brown dark:text-dark-text">{state.series.length}</div>
          <div className="text-warm-brown-light dark:text-dark-text-muted">Figurines</div>
          <div className="font-bold text-warm-brown dark:text-dark-text">{state.figurines.length}</div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl p-5 shadow-sm border border-red-200 dark:border-red-900/30">
        <h3 className="text-sm font-bold text-red-600 dark:text-red-400 mb-3 m-0">Danger Zone</h3>
        <p className="text-xs text-warm-brown-light dark:text-dark-text-muted mb-3">
          This will erase your entire collection and reset to defaults.
        </p>
        <Button variant="danger" size="sm" onClick={() => setShowReset(true)}>
          <Trash2 size={16} /> Reset Everything
        </Button>
      </div>

      <ConfirmDialog
        open={showReset}
        onClose={() => setShowReset(false)}
        onConfirm={handleReset}
        title="Reset Collection"
        message="Are you sure? This will delete all your figurines, series, and brands. This cannot be undone."
        confirmLabel="Reset Everything"
      />
    </div>
  );
}
