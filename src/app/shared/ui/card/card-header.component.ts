import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-header',
  imports: [CommonModule],
  template: `
    <div class="card-header">
      <div class="card-header-content">
        <div *ngIf="avatar" class="card-avatar">
          <img
            [src]="avatar"
            [alt]="avatarAlt || 'Avatar'"
            class="avatar-image"
          />
        </div>
        <div class="card-header-text">
          <h3 *ngIf="title" class="card-title">{{ title }}</h3>
          <p *ngIf="subtitle" class="card-subtitle">{{ subtitle }}</p>
        </div>
      </div>
      <div *ngIf="actions" class="card-actions">
        <ng-content select="[card-actions]"></ng-content>
      </div>
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
