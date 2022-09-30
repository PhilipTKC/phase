import { DI } from "aurelia";
import { ISound } from "../common/interfaces";

export type ISoundsService = SoundsService;

export const ISoundsService = DI.createInterface<ISoundsService>(
  "ISoundsService",
  (x) => x.singleton(SoundsService)
);

export class SoundsService {
  async retrieveSounds(): Promise<ISound[]> {
    return fetch("./sounds.json").then((response) => response.json());
  }
}
