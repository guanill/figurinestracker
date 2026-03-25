import { useState, useEffect } from 'react';
import { CollectionProvider, useCollectionContext } from './context/CollectionContext';
import { ToastProvider, useToast } from './components/ui/Toast';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { Dashboard } from './components/dashboard/Dashboard';
import { BrandPage } from './components/collection/BrandPage';
import { SettingsPanel } from './components/settings/SettingsPanel';
import { BrandForm } from './components/forms/BrandForm';
import { SeriesForm } from './components/forms/SeriesForm';
import { FigurineForm } from './components/forms/FigurineForm';
import { ConfirmDialog } from './components/ui/ConfirmDialog';
import { SMISKI_BRAND_ID_EXPORT } from './data/presets';
import type { Page, Figurine, Series, Brand } from './types';

function AppInner() {
  const ctx = useCollectionContext();
  const { toast } = useToast();
  // Start on Smiski brand page
  const [page, setPage] = useState<Page>({ type: 'brand', brandId: SMISKI_BRAND_ID_EXPORT });
  const [search, setSearch] = useState('');

  // Brand form state
  const [showBrandForm, setShowBrandForm] = useState(false);
  const [editBrand, setEditBrand] = useState<Brand | null>(null);

  // Series form state
  const [showSeriesForm, setShowSeriesForm] = useState(false);
  const [seriesFormBrandId, setSeriesFormBrandId] = useState('');
  const [editSeries, setEditSeries] = useState<Series | null>(null);

  // Figurine form state
  const [showFigurineForm, setShowFigurineForm] = useState(false);
  const [figurineFormSeriesId, setFigurineFormSeriesId] = useState('');
  const [figurineFormBrandId, setFigurineFormBrandId] = useState('');
  const [editFigurine, setEditFigurine] = useState<Figurine | null>(null);

  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: string; id: string; name: string } | null>(null);

  // Initialize theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', ctx.state.settings.theme === 'dark');
  }, []);

  // Handlers
  const handleAddBrand = () => {
    setEditBrand(null);
    setShowBrandForm(true);
  };

  const handleAddSeries = (brandId: string) => {
    setEditSeries(null);
    setSeriesFormBrandId(brandId);
    setShowSeriesForm(true);
  };

  const handleEditSeries = (series: Series) => {
    setEditSeries(series);
    setSeriesFormBrandId(series.brandId);
    setShowSeriesForm(true);
  };

  const handleAddFigurine = (seriesId: string, brandId: string) => {
    setEditFigurine(null);
    setFigurineFormSeriesId(seriesId);
    setFigurineFormBrandId(brandId);
    setShowFigurineForm(true);
  };

  const handleEditFigurine = (figurine: Figurine) => {
    setEditFigurine(figurine);
    setFigurineFormSeriesId(figurine.seriesId);
    setFigurineFormBrandId(figurine.brandId);
    setShowFigurineForm(true);
  };

  const handleDeleteFigurine = (id: string) => {
    const fig = ctx.state.figurines.find(f => f.id === id);
    setDeleteConfirm({ type: 'figurine', id, name: fig?.name || 'this figurine' });
  };

  const handleDeleteSeries = (id: string) => {
    const s = ctx.state.series.find(sr => sr.id === id);
    setDeleteConfirm({ type: 'series', id, name: s?.name || 'this series' });
  };

  const confirmDelete = () => {
    if (!deleteConfirm) return;
    if (deleteConfirm.type === 'figurine') {
      ctx.deleteFigurine(deleteConfirm.id);
      toast('Figurine deleted');
    } else if (deleteConfirm.type === 'series') {
      ctx.deleteSeries(deleteConfirm.id);
      toast('Series deleted');
    } else if (deleteConfirm.type === 'brand') {
      ctx.deleteBrand(deleteConfirm.id);
      toast('Brand deleted');
      setPage({ type: 'dashboard' });
    }
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg transition-colors">
      <Header search={search} onSearchChange={setSearch} onNavigate={setPage} />

      <div className="flex">
        <Sidebar
          currentPage={page}
          onNavigate={setPage}
          onAddBrand={handleAddBrand}
        />

        <main className="flex-1 min-w-0 px-3 py-3 sm:p-4 lg:p-6 pb-20 lg:pb-6 min-h-[calc(100vh-57px)] overflow-x-hidden">
          {page.type === 'dashboard' && (
            <Dashboard
              onNavigate={setPage}
              onEditFigurine={handleEditFigurine}
              onDeleteFigurine={handleDeleteFigurine}
            />
          )}
          {page.type === 'brand' && (
            <BrandPage
              brandId={page.brandId}
              searchQuery={search}
              onAddSeries={handleAddSeries}
              onEditSeries={handleEditSeries}
              onDeleteSeries={handleDeleteSeries}
              onAddFigurine={handleAddFigurine}
              onEditFigurine={handleEditFigurine}
              onDeleteFigurine={handleDeleteFigurine}
            />
          )}
          {page.type === 'settings' && <SettingsPanel />}
        </main>
      </div>

      <MobileNav currentPage={page} onNavigate={setPage} />

      {/* Forms */}
      <BrandForm
        open={showBrandForm}
        onClose={() => setShowBrandForm(false)}
        onSave={(name, emoji) => { ctx.addBrand(name, emoji); toast(`${name} added!`); }}
        onUpdate={(id, updates) => { ctx.updateBrand(id, updates); toast('Brand updated'); }}
        editBrand={editBrand}
      />

      <SeriesForm
        open={showSeriesForm}
        onClose={() => setShowSeriesForm(false)}
        brandId={seriesFormBrandId}
        onSave={(brandId, name, total, year) => { ctx.addSeries(brandId, name, total, year); toast(`${name} series added!`); }}
        onUpdate={(id, updates) => { ctx.updateSeries(id, updates); toast('Series updated'); }}
        editSeries={editSeries}
      />

      <FigurineForm
        open={showFigurineForm}
        onClose={() => setShowFigurineForm(false)}
        seriesId={figurineFormSeriesId}
        brandId={figurineFormBrandId}
        onSave={(data) => { ctx.addFigurine(data); toast(`${data.name} added to your shelf!`); }}
        onUpdate={(id, updates) => { ctx.updateFigurine(id, updates); toast('Figurine updated'); }}
        editFigurine={editFigurine}
      />

      <ConfirmDialog
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={confirmDelete}
        title={`Delete ${deleteConfirm?.type || ''}?`}
        message={`Are you sure you want to delete "${deleteConfirm?.name}"? This cannot be undone.`}
      />
    </div>
  );
}

export default function App() {
  return (
    <CollectionProvider>
      <ToastProvider>
        <AppInner />
      </ToastProvider>
    </CollectionProvider>
  );
}
