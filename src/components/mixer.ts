import { StoreDispatchActions } from "./../common/enums";
import { ICustomElementViewModel } from "aurelia";
import { IState } from "../store/state";
import { connectTo, Store } from "@aurelia/store-v1";
import { pluck, distinctUntilChanged } from "rxjs/operators";
import { ISound } from "../common/interfaces";

@connectTo<IState>({
  selector: {
    activeSounds: (store) =>
      store.state.pipe(pluck("activeSounds"), distinctUntilChanged()),
  },
})
export class Mixer implements ICustomElementViewModel {
  private activeSounds: ISound[];

  constructor(private readonly store: Store<IState>) {}

  async removeSound(sound: ISound) {
    await this.store.dispatch(StoreDispatchActions.spliceSound, sound);
  }
}
