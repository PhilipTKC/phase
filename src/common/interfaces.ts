export interface ICategory {
  active: boolean;
  id: number;
  name: string;
  path: string;
  count: number;
  activeSounds: number;
}

export interface ISound {
  id: number;
  name: string;
  path: string;
  category: number;
  isPlaying: boolean;
  volume: number;
  audio?: any;
}

export interface IState {
  activeSounds: ISound[];
  activeFilters: number[];
  categories: ICategory[];
  isSearching: boolean;
}
