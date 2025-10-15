import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-header',
  standalone: true,
  template: `
    <div class="card-header">
      <div class="card-header-content">
        @if (avatar) {
          <div class="card-avatar">
            <img
              [src]="avatar"
              [alt]="avatarAlt || 'Avatar'"
              class="avatar-image"
            />
          </div>
        }
        <div class="card-header-text">
          @if (title) {
            <h3 class="card-title">{{ title }}</h3>
          }
          @if (subtitle) {
            <p class="card-subtitle">{{ subtitle }}</p>
          }
        </div>
      </div>
      @if (actions) {
        <div class="card-actions">
          <ng-content select="[card-actions]"></ng-content>
        </div>
      }
    </div>
  `,
  styleUrls: ['./card-header.component.scss'],
})
export class CardHeaderComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() avatar?: string;
  @Input() avatarAlt?: string;
  @Input() actions?: boolean;
}
