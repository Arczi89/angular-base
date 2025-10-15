import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface GalleryItem {
  imageUrl: string;
  imageAlt?: string;
  text: string;
}

@Component({
  selector: 'app-image-gallery',
  imports: [CommonModule],
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent {
  items = input<GalleryItem[]>([]);
  columns = input<1 | 2 | 3>(3);
  imageHeight = input<string>('200px');
  gap = input<string>('1rem');
}
