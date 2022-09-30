import { Store } from "@aurelia/store-v1";
import { bindable, BindingMode, ICustomElementViewModel } from "aurelia";
import Fuse from "fuse.js";
import { ISound, IState } from "../common/interfaces";
import { setIsSearching } from "../store/actions";

export class SearchBar implements ICustomElementViewModel {
  @bindable searchQuery: string;

  @bindable({ mode: BindingMode.twoWay }) private sounds: ISound[];

  @bindable private updateSoundState: (sounds: ISound[]) => void;

  @bindable private updateSoundCollection: () => void;

  private fuse: Fuse<any>;

  private state: IState;

  constructor(private readonly store: Store<IState>) {
    this.store.state.subscribe((state) => (this.state = state));
  }

  binding(): void {
    this.fuse = new Fuse(this.sounds, {
      keys: ["name", "title"],
    });
  }

  async searchQueryChanged(): Promise<void> {
    const results = this.fuse.search(this.searchQuery);

    if (this.searchQuery.length === 0) {
      this.updateSoundCollection();
      await this.store.dispatch(setIsSearching, false);
    }

    if (results.length > 0) {
      this.sounds = results.map((item) => item.item);
      this.updateSoundState(this.sounds);
      await this.store.dispatch(setIsSearching, true);
    }
  }

  soundsChanged(): void {
    this.fuse.setCollection(this.sounds);
  }
}
