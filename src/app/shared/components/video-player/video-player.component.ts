import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface VideoConfig {
  src: string;
  poster?: string;
  width?: string;
  height?: string;
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
    width: '100%',
    height: '400px',
    controls: true,
    autoplay: false,
    muted: false,
    loop: false,
  });
}
