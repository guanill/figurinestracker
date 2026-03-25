export type FigurineStatus = 'owned' | 'wishlist' | 'trading';
export type FigurineVariant = 'regular' | 'secret' | 'limited' | 'chase';
export type ViewMode = 'grid' | 'list' | 'shelf';
export type ThemeMode = 'light' | 'dark';
export type Page = { type: 'dashboard' } | { type: 'brand'; brandId: string } | { type: 'settings' };

export interface Figurine {
  id: string;
  brandId: string;
  seriesId: string;
  name: string;
  status: FigurineStatus;
  variant: FigurineVariant;
  imageUrl: string;
  notes: string;
  acquiredDate: string;
  tradingFor: string;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Series {
  id: string;
  brandId: string;
  name: string;
  releaseYear?: number;
  totalInSeries?: number;
  color: string;
  sortOrder: number;
  artworkUrl?: string;
  groupImageUrl?: string;
  tabIconUrl?: string;
}

export interface Brand {
  id: string;
  name: string;
  emoji: string;
  sortOrder: number;
}

export interface AppSettings {
  theme: ThemeMode;
  viewMode: ViewMode;
}

export interface AppState {
  brands: Brand[];
  series: Series[];
  figurines: Figurine[];
  settings: AppSettings;
  _version: number;
}
