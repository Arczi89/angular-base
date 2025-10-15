import { Component, input, model } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';

export interface ModalConfig {
  title: string;
  imageUrl?: string;
  imageAlt?: string;
  text?: string;
  hideImage?: boolean;
  hideText?: boolean;
  width?: string;
  height?: string;
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  config = input<ModalConfig>({
    title: 'Modal',
    width: '500px',
    height: 'auto',
  });
  isOpen = model<boolean>(false);

  protected onClose(): void {
    this.isOpen.set(false);
  }

  protected onBackdropClick(event: Event): void {
    event.stopPropagation();
  }
}
