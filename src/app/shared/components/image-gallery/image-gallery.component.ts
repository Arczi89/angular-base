import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface GalleryItem {
  imageUrl: string;
  imageAlt?: string;
  text: string;
}

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent {
  @Input() items: GalleryItem[] = [];
  @Input() columns: 1 | 2 | 3 = 3;
  @Input() imageHeight: string = '200px';
  @Input() gap: string = '1rem';
}
