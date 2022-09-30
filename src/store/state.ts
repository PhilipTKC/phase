import { ICategory, ISound } from "../common/interfaces";

export interface IState {
  activeSounds: ISound[];
  activeFilters: number[];
  categories: ICategory[];
  isSearching: boolean;
}

export const initialState = {
  activeSounds: [],
  activeFilters: [],
  categories: [],
  isSearching: false,
};
