import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-actions',
  imports: [CommonModule],
  template: `
    <div class="card-actions">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./card-actions.component.scss'],
})
export class CardActionsComponent {}
