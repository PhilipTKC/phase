import { ICustomElementViewModel } from "aurelia";
import { connectTo, Store } from "@aurelia/store-v1";

import { ICategoriesService } from "../services/categories-service";
import { IState } from "../store/state";
import {
  pushCategories,
  pushFilter,
  spliceFilter,
  determineIfCategoryActive,
  toggleCategoryState,
  determineIfCategorySoundsActive,
} from "./../store/actions/index";

@connectTo()
export class SideBarFilter implements ICustomElementViewModel {
  private state: IState;

  constructor(
    @ICategoriesService private readonly categoryService: ICategoriesService,
    private readonly store: Store<IState>
  ) {
    this.store.state.subscribe((state) => (this.state = state));
  }

  async binding() {
    const categories = await this.categoryService.retrieveCategories();

    await this.store
      .pipe(pushCategories, categories)
      .pipe(determineIfCategoryActive)
      .pipe(determineIfCategorySoundsActive)
      .dispatch();
  }

  async toggleCategory(id: number) {
    const index = this.state.activeFilters.findIndex((filter) => filter === id);
    const category = this.state.categories.find((x) => x.id === id);

    if (index === -1) {
      await this.store
        .pipe(pushFilter, id)
        .pipe(toggleCategoryState, category.id, true)
        .dispatch();
    } else {
      await this.store
        .pipe(spliceFilter, index)
        .pipe(toggleCategoryState, category.id, false)
        .dispatch();
    }
  }
}
