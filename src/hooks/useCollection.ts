import { useState, useCallback, useRef, useEffect } from 'react';
import type { AppState, Brand, Series, Figurine, FigurineStatus, AppSettings } from '../types';
import { loadState, saveState } from '../lib/storage';
import { genId, now } from '../lib/utils';

export function useCollection() {
  const [state, setState] = useState<AppState>(loadState);
  const saveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveState(state), 300);
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
  }, [state]);

  // Brands
  const addBrand = useCallback((name: string, emoji: string) => {
    setState(s => ({
      ...s,
      brands: [...s.brands, { id: genId(), name, emoji, sortOrder: s.brands.length }],
    }));
  }, []);

  const updateBrand = useCallback((id: string, updates: Partial<Brand>) => {
    setState(s => ({
      ...s,
      brands: s.brands.map(b => b.id === id ? { ...b, ...updates } : b),
    }));
  }, []);

  const deleteBrand = useCallback((id: string) => {
    setState(s => ({
      ...s,
      brands: s.brands.filter(b => b.id !== id),
      series: s.series.filter(sr => sr.brandId !== id),
      figurines: s.figurines.filter(f => f.brandId !== id),
    }));
  }, []);

  // Series
  const addSeries = useCallback((brandId: string, name: string, totalInSeries?: number, releaseYear?: number) => {
    setState(s => ({
      ...s,
      series: [...s.series, {
        id: genId(), brandId, name, totalInSeries, releaseYear,
        color: '#E8A0BF', sortOrder: s.series.filter(sr => sr.brandId === brandId).length,
      }],
    }));
  }, []);

  const updateSeries = useCallback((id: string, updates: Partial<Series>) => {
    setState(s => ({
      ...s,
      series: s.series.map(sr => sr.id === id ? { ...sr, ...updates } : sr),
    }));
  }, []);

  const deleteSeries = useCallback((id: string) => {
    setState(s => ({
      ...s,
      series: s.series.filter(sr => sr.id !== id),
      figurines: s.figurines.filter(f => f.seriesId !== id),
    }));
  }, []);

  // Figurines
  const addFigurine = useCallback((data: Pick<Figurine, 'brandId' | 'seriesId' | 'name' | 'status' | 'variant' | 'imageUrl' | 'notes' | 'acquiredDate' | 'tradingFor'>) => {
    const ts = now();
    setState(s => ({
      ...s,
      figurines: [...s.figurines, {
        ...data, id: genId(), favorite: false, createdAt: ts, updatedAt: ts,
      }],
    }));
  }, []);

  const updateFigurine = useCallback((id: string, updates: Partial<Figurine>) => {
    setState(s => ({
      ...s,
      figurines: s.figurines.map(f => f.id === id ? { ...f, ...updates, updatedAt: now() } : f),
    }));
  }, []);

  const deleteFigurine = useCallback((id: string) => {
    setState(s => ({ ...s, figurines: s.figurines.filter(f => f.id !== id) }));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setState(s => ({
      ...s,
      figurines: s.figurines.map(f => f.id === id ? { ...f, favorite: !f.favorite, updatedAt: now() } : f),
    }));
  }, []);

  const setStatus = useCallback((id: string, status: FigurineStatus) => {
    setState(s => ({
      ...s,
      figurines: s.figurines.map(f => f.id === id ? { ...f, status, updatedAt: now() } : f),
    }));
  }, []);

  // Settings
  const updateSettings = useCallback((updates: Partial<AppSettings>) => {
    setState(s => ({ ...s, settings: { ...s.settings, ...updates } }));
  }, []);

  // Import
  const importState = useCallback((newState: AppState) => {
    setState(newState);
  }, []);

  return {
    state,
    addBrand, updateBrand, deleteBrand,
    addSeries, updateSeries, deleteSeries,
    addFigurine, updateFigurine, deleteFigurine,
    toggleFavorite, setStatus,
    updateSettings, importState,
  };
}
