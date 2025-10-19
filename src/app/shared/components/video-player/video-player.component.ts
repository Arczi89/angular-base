import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface VideoConfig {
  src: string;
  poster?: string;
  controls?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

@Component({
  selector: 'app-video-player',
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent {
  config = input<VideoConfig>({
    src: '',
    controls: true,
    autoplay: false,
    muted: false,
    loop: false,
  });
}
