import produce from "immer";
import { ICategory, ISound, IState } from "../../common/interfaces";
import { ArithmeticOp } from "../../common/types";

export const pushSound = async (
  state: IState,
  sound: ISound
): Promise<IState> => {
  return produce(state, (draftState) => {
    draftState.activeSounds.push(sound);
  });
};

export const spliceSound = async (
  state: IState,
  sound: ISound
): Promise<IState> => {
  return produce(state, (draftState) => {
    const index = draftState.activeSounds.findIndex((x) => x.id === sound.id);
    draftState.activeSounds.splice(index, 1);
  });
};

export const updateSound = async (
  state: IState,
  sound: ISound
): Promise<IState> => {
  return produce(state, (draftState) => {
    draftState.activeSounds.find((x) => x.id === sound.id).volume =
      sound.volume;
  });
};

export const pushFilter = async (
  state: IState,
  id: number
): Promise<IState> => {
  return produce(state, (draftState) => {
    draftState.activeFilters.push(id);
  });
};

export const spliceFilter = async (
  state: IState,
  index: number
): Promise<IState> => {
  return produce(state, (draftState) => {
    draftState.activeFilters.splice(index, 1);
  });
};

export const pushCategories = async (
  state: IState,
  categories: ICategory[]
) => {
  return produce(state, (draftState) => {
    draftState.categories = categories;
  });
};

export const determineIfCategoryActive = async (state: IState) => {
  return produce(state, (draftState) => {
    if (draftState.activeFilters.length > 0) {
      draftState.activeFilters.forEach((filter) => {
        draftState.categories.find((x) => x.id === filter).active = true;
      });
    }
  });
};

export const determineIfCategorySoundsActive = async (state: IState) => {
  return produce(state, (draftState) => {
    draftState.activeSounds.forEach((sound) => {
      const category = draftState.categories.find(
        (x) => x.id === sound.category
      );
      if (category) {
        category.activeSounds += 1;
      }
    });
  });
};

export const toggleCategoryState = async (
  state: IState,
  categoryId: number,
  isActive: boolean
) => {
  return produce(state, (draftState) => {
    const category = draftState.categories.find((x) => x.id === categoryId);
    category.active = isActive;
  });
};

export const updateCategoryCount = async (
  state: IState,
  id: number,
  arithmeticOp: ArithmeticOp
) => {
  return produce(state, (draftState) => {
    const category = draftState.categories.find((x) => x.id === id);

    if (arithmeticOp === "Add") {
      category.activeSounds += 1;
    }

    if (arithmeticOp === "Subtract") {
      category.activeSounds -= 1;
    }
  });
};

export const setIsSearching = async (state: IState, isSearching: boolean) => {
  return produce(state, (draftState) => {
    draftState.isSearching = isSearching;
  });
};
