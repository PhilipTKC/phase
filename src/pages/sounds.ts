import { bindable, BindingMode, IRouteViewModel } from "aurelia";
import { connectTo, Store } from "@aurelia/store-v1";
import { pluck, distinctUntilChanged } from "rxjs/operators";

import { pushSound, spliceSound, updateCategoryCount } from "../store/actions";
import { ArithmeticOp } from "../common/types";
import { ISound, IState } from "../common/interfaces";
import { ISoundsService } from "../services/sounds-service";

@connectTo<IState>({
  selector: {
    activeFilters: (store) =>
      store.state.pipe(pluck("activeFilters"), distinctUntilChanged()),
  },
})
export class Sounds implements IRouteViewModel {
  @bindable({ mode: BindingMode.twoWay }) private sounds: ISound[];

  private allSounds: ISound[];

  private state: IState;

  constructor(
    @ISoundsService private readonly soundsService: ISoundsService,
    private readonly store: Store<IState>
  ) {
    this.store.state.subscribe((state) => (this.state = state));
  }

  async loading(): Promise<void> {
    await this.retrieveSounds();
  }

  async retrieveSounds(): Promise<void> {
    const sounds = await this.soundsService.retrieveSounds();

    // Keep a copy of sounds data
    this.allSounds = JSON.parse(JSON.stringify(sounds));

    // Check state for active filters
    if (this.state.activeFilters.length > 0) {
      // Restore sound state if sound exist in `state.activeSounds` collection
      this.sounds = this.restoreSoundState(
        // Only return sounds that match active filters
        this.retrieveSoundsByCategory(sounds)
      );
    } else {
      // Return all sounds and restore sound state
      this.sounds = this.restoreSoundState(sounds);
    }
  }

  async previewSound(sound: ISound): Promise<void> {
    if (!sound.isPlaying) {
      sound.isPlaying = true;
      if (sound.audio === undefined) {
        sound.audio = new Audio(sound.path);
      }
      await this.store.dispatch(pushSound, sound);
      const audio = sound.audio as HTMLAudioElement;
      audio.loop = true;
      audio.play();
      audio.addEventListener("timeupdate", (time) => {
        if (audio.duration - audio.currentTime < 1) {
          console.log(audio.duration - audio.currentTime);
          audio.volume = audio.duration - audio.currentTime;
        }
      });
      this.updateActiveCount(sound.category, "Add");
    } else {
      sound.isPlaying = false;
      await this.store.dispatch(spliceSound, sound);
      sound.audio.pause();
      this.updateActiveCount(sound.category, "Subtract");
    }
  }

  async updateActiveCount(
    categoryId: number,
    arithmeticOp: ArithmeticOp
  ): Promise<void> {
    await this.store.dispatch(updateCategoryCount, categoryId, arithmeticOp);
  }

  retrieveSoundsByCategory(sounds: ISound[]): ISound[] {
    return this.allSounds
      .map((x) => {
        const index = sounds.findIndex((y) => y.id === x.id);
        return {
          ...x,
          ...sounds[index],
        };
      })
      .filter((sound) => {
        if (this.state.activeFilters.length > 0) {
          return this.state.activeFilters.includes(sound.category);
        }

        return true;
      });
  }

  restoreSoundState(collection: ISound[]): ISound[] {
    return collection.map((sound) => {
      const activeSound = this.state.activeSounds.find(
        (activeSound) => activeSound.id === sound.id
      );

      return activeSound ? activeSound : sound;
    });
  }

  updateSoundCollection(): void {
    this.sounds = this.restoreSoundState(
      this.retrieveSoundsByCategory(this.sounds)
    );
  }

  activeFiltersChanged(newValue: IState, oldValue: IState): void {
    if (oldValue === undefined) {
      return;
    }

    if (this.state.isSearching) {
      return;
    }

    this.updateSoundCollection();
  }

  volumeChanged(sound: ISound): void {
    sound.audio.volume = sound.volume / 100;
  }
}
