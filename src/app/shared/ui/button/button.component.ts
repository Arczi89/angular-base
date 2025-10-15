import { Component, input, output, computed } from '@angular/core';

export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'solid' | 'outline' | 'ghost';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
})
export class ButtonComponent {
  text = input<string>('');
  type = input<'button' | 'submit' | 'reset'>('button');
  buttonType = input<ButtonType>('primary');
  size = input<ButtonSize>('medium');
  variant = input<ButtonVariant>('solid');
  disabled = input<boolean>(false);
  icon = input<string>();
  onClick = output<Event>();

  buttonClasses = computed(() => {
    const classes = [
      'btn',
      `btn--${this.buttonType()}`,
      `btn--${this.size()}`,
      `btn--${this.variant()}`,
    ];

    if (this.disabled()) {
      classes.push('btn--disabled');
    }

    return classes.join(' ');
  });
}
