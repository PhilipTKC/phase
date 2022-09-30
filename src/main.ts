import {
  pushCategories,
  determineIfCategoryActive,
  updateSound,
  toggleCategoryState,
  determineIfCategorySoundsActive,
  setIsSearching,
} from "./store/actions/index";
import {
  pushFilter,
  spliceFilter,
  pushSound,
  spliceSound,
  updateCategoryCount,
} from "./store/actions";
import Aurelia from "aurelia";
import { RouterConfiguration } from "@aurelia/router";
import { MyApp } from "./my-app";
import { StoreConfiguration, Store } from "@aurelia/store-v1";

import { initialState } from "./store/state";
import * as components from "./components";

const app = Aurelia.register(
  RouterConfiguration.customize({
    useUrlFragmentHash: false,
    title: "${componentTitles} | Phase",
  })
)
  .register(StoreConfiguration.withInitialState(initialState))
  .register(components)
  .app(MyApp);

const store = app.container.get(Store);

store.registerAction(pushSound.name, pushSound);
store.registerAction(spliceSound.name, spliceSound);
store.registerAction(pushFilter.name, pushFilter);
store.registerAction(spliceFilter.name, spliceFilter);
store.registerAction(updateSound.name, updateSound);
store.registerAction(pushCategories.name, pushCategories);
store.registerAction(determineIfCategoryActive.name, determineIfCategoryActive);
store.registerAction(
  determineIfCategorySoundsActive.name,
  determineIfCategorySoundsActive
);
store.registerAction(toggleCategoryState.name, toggleCategoryState);
store.registerAction(updateCategoryCount.name, updateCategoryCount);
store.registerAction(setIsSearching.name, setIsSearching);

app.start();
