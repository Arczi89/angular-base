import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  template: `
    <div class="card" [class]="cardClasses()">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  variant = input<CardVariant>('default');
  padding = input<'none' | 'small' | 'medium' | 'large'>('medium');

  cardClasses = computed(() => {
    const classes = [
      'card',
      `card--${this.variant()}`,
      `card--padding-${this.padding()}`,
    ];
    return classes.join(' ');
  });
}
