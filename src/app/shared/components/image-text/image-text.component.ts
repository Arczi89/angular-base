import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ImageTextConfig {
  imageUrl: string;
  imageAlt?: string;
  text: string;
  layout: 'horizontal' | 'vertical';
  hideImage?: boolean;
  hideText?: boolean;
  imageRatio?: '1:1' | '16:9' | '4:3' | '3:2';
  textRatio?: '1:1' | '16:9' | '4:3' | '3:2';
}

@Component({
  selector: 'app-image-text',
  imports: [CommonModule],
  templateUrl: './image-text.component.html',
  styleUrls: ['./image-text.component.scss'],
})
export class ImageTextComponent {
  config = input.required<ImageTextConfig>();

  imageClass = computed(() => {
    if (this.config().hideImage) return 'hidden';
    return `image-${this.config().imageRatio?.replace(':', '-') || '1-1'}`;
  });

  textClass = computed(() => {
    if (this.config().hideText) return 'hidden';
    return `text-${this.config().textRatio?.replace(':', '-') || '1-1'}`;
  });

  containerClass = computed(() => {
    return `container-${this.config().layout}`;
  });
}
