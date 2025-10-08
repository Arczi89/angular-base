import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type RadioSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-radio',
  imports: [CommonModule],
  template: `
    <label class="radio-wrapper" [class]="wrapperClasses">
      <input
        type="radio"
        [name]="name"
        [value]="value"
        [checked]="checked"
        [disabled]="disabled"
        [class]="radioClasses"
        (change)="onRadioChange($event)"
        class="radio-input"
      />
      <span class="radio-custom"></span>
      <span *ngIf="label" class="radio-label">{{ label }}</span>
    </label>
  `,
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
})
export class RadioComponent implements ControlValueAccessor {
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() label?: string;
  @Input() size: RadioSize = 'medium';
  @Input() disabled: boolean = false;
  @Input() checked: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  get wrapperClasses(): string {
    const classes = ['radio-wrapper', `radio-wrapper--${this.size}`];
    if (this.disabled) classes.push('radio-wrapper--disabled');
    return classes.join(' ');
  }

  get radioClasses(): string {
    const classes = ['radio-input', `radio-input--${this.size}`];
    if (this.disabled) classes.push('radio-input--disabled');
    return classes.join(' ');
  }

  onRadioChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.onChange(this.checked);
    this.checkedChange.emit(this.checked);
  }

  writeValue(value: boolean): void {
    this.checked = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
