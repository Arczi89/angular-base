import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type CheckboxSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-checkbox',
  imports: [CommonModule],
  template: `
    <label class="checkbox-wrapper" [class]="wrapperClasses">
      <input
        type="checkbox"
        [checked]="checked"
        [disabled]="disabled"
        [class]="checkboxClasses"
        (change)="onCheckboxChange($event)"
        class="checkbox-input"
      />
      <span class="checkbox-custom"></span>
      <span *ngIf="label" class="checkbox-label">{{ label }}</span>
    </label>
  `,
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() size: CheckboxSize = 'medium';
  @Input() disabled: boolean = false;
  @Input() checked: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  get wrapperClasses(): string {
    const classes = ['checkbox-wrapper', `checkbox-wrapper--${this.size}`];
    if (this.disabled) classes.push('checkbox-wrapper--disabled');
    return classes.join(' ');
  }

  get checkboxClasses(): string {
    const classes = ['checkbox-input', `checkbox-input--${this.size}`];
    if (this.disabled) classes.push('checkbox-input--disabled');
    return classes.join(' ');
  }

  onCheckboxChange(event: Event): void {
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
