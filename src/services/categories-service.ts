import { DI } from "aurelia";
import { ICategory } from "../common/interfaces";

export type ICategoriesService = CategoriesService;

export const ICategoriesService = DI.createInterface<ICategoriesService>(
  "ICategoriesService",
  (x) => x.singleton(CategoriesService)
);

export class CategoriesService {
  async retrieveCategories(): Promise<ICategory[]> {
    return fetch("./categories.json").then((response) => response.json());
  }
}
