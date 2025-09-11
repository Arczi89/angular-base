import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [class]="buttonClasses"
      (click)="onClick.emit($event)"
      class="btn"
    >
      <span *ngIf="icon" class="btn-icon">{{ icon }}</span>
      <span class="btn-text">{{ text }}</span>
    </button>
  `,
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() buttonType: ButtonType = 'primary';
  @Input() size: ButtonSize = 'medium';
  @Input() variant: ButtonVariant = 'solid';
  @Input() disabled: boolean = false;
  @Input() icon?: string;
  @Output() onClick = new EventEmitter<Event>();

  get buttonClasses(): string {
    const classes = [
      'btn',
      `btn--${this.buttonType}`,
      `btn--${this.size}`,
      `btn--${this.variant}`,
    ];

    if (this.disabled) {
      classes.push('btn--disabled');
    }

    return classes.join(' ');
  }
}
