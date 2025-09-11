import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [class]="cardClasses">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() variant: CardVariant = 'default';
  @Input() padding: 'none' | 'small' | 'medium' | 'large' = 'medium';

  get cardClasses(): string {
    const classes = [
      'card',
      `card--${this.variant}`,
      `card--padding-${this.padding}`,
    ];
    return classes.join(' ');
  }
}
