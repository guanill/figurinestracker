import type { AppState } from '../types';
import { DEFAULT_STATE } from '../data/presets';

const STORAGE_KEY = 'tinyshelf_v5';
const CURRENT_VERSION = 5;

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as AppState;
    if (parsed._version !== CURRENT_VERSION) {
      return migrate(parsed);
    }
    return parsed;
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

function migrate(state: AppState): AppState {
  if (!state._version || state._version < 5) {
    return DEFAULT_STATE;
  }
  return { ...state, _version: CURRENT_VERSION };
}

export function exportData(state: AppState): string {
  return JSON.stringify(state, null, 2);
}

export function importData(json: string): AppState | null {
  try {
    const parsed = JSON.parse(json);
    if (parsed.brands && parsed.series && parsed.figurines) {
      return { ...parsed, _version: CURRENT_VERSION };
    }
    return null;
  } catch {
    return null;
  }
}

export function getStorageUsage(): number {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? new Blob([raw]).size : 0;
}
