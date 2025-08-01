import { Component, Input } from '@angular/core';
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
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent {
  @Input() config: VideoConfig = {
    src: '',
    width: '100%',
    height: '400px',
    controls: true,
    autoplay: false,
    muted: false,
    loop: false,
  };
}
