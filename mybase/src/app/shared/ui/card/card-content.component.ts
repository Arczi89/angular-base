import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-content">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./card-content.component.scss'],
})
export class CardContentComponent {}
