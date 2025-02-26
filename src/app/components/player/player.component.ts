import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroPlay,
  heroPause,
  heroArrowPath,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [NgIcon, CommonModule],
  template: `
    <div class="flex flex-col items-center space-y-4">
      <div class="flex items-center space-x-4">
        <button
          class="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg"
          (click)="togglePlay()"
        >
          <ng-icon
            *ngIf="!isPlaying()"
            name="heroPlay"
            class="w-10 h-10 text-gray-800"
          ></ng-icon>
          <ng-icon
            *ngIf="isPlaying()"
            name="heroPause"
            class="w-10 h-10 text-gray-800"
          ></ng-icon>
        </button>
        <button
          class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md"
          (click)="restart()"
        >
          <ng-icon name="heroArrowPath" class="w-6 h-6 text-gray-800"></ng-icon>
        </button>
      </div>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        [value]="volume()"
        (input)="updateVolume($event)"
        class="w-48 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  `,
  providers: [provideIcons({ heroPlay, heroPause, heroArrowPath })],
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
    `,
  ],
})
export class PlayerComponent {
  private audio = new Audio('/sound.mp3');
  isPlaying = signal(false);
  volume = signal(0.5);

  constructor() {
    this.audio.volume = this.volume();
  }

  togglePlay() {
    if (this.isPlaying()) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.isPlaying.set(!this.isPlaying());
  }

  restart() {
    this.audio.currentTime = 0;
    this.audio.play();
    this.isPlaying.set(true);
  }

  updateVolume(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.volume.set(parseFloat(inputElement.value));
    this.audio.volume = this.volume();
  }
}
