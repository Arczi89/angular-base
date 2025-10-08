import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  template: `
    @if (isOpen) {
      <div
        class="modal-backdrop"
        (click)="onBackdropClick($event)"
        [class.modal-open]="isOpen"
      >
        <div
          class="modal-container"
          [style.width]="config.width"
          [style.height]="config.height"
        >
          <div class="modal-header">
            <h2 class="modal-title">{{ config.title }}</h2>
            <app-button
              text="✕"
              buttonType="secondary"
              size="small"
              variant="ghost"
              (onClick)="onClose()"
              class="close-button"
            >
            </app-button>
          </div>

          <div class="modal-content">
            @if (config.imageUrl && !config.hideImage) {
              <div class="modal-image">
                <img
                  [src]="config.imageUrl"
                  [alt]="config.imageAlt || 'Modal image'"
                  class="image"
                />
              </div>
            }

            @if (config.text && !config.hideText) {
              <div class="modal-text">
                <p>{{ config.text }}</p>
              </div>
            }
          </div>
        </div>
      </div>
    }
  `,
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() config: ModalConfig = {
    title: 'Modal',
    width: '500px',
    height: 'auto',
  };
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}
