import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  input,
  output,
  model,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type CheckboxSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  template: `
    <label class="checkbox-wrapper" [class]="wrapperClasses()">
      <input
        type="checkbox"
        [checked]="checked()"
        [disabled]="disabled()"
        [class]="checkboxClasses()"
        (change)="onCheckboxChange($event)"
        class="checkbox-input"
      />
      <span class="checkbox-custom"></span>
      @if (label()) {
        <span class="checkbox-label">{{ label() }}</span>
      }
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
  label = input<string>('');
  size = input<CheckboxSize>('medium');
  disabled = input<boolean>(false);
  checked = model<boolean>(false);

  private onChange = (value: boolean) => {};
  private onTouched = (value: boolean) => {};

  wrapperClasses(): string {
    const classes = ['checkbox-wrapper', `checkbox-wrapper--${this.size}`];
    if (this.disabled()) classes.push('checkbox-wrapper--disabled');
    return classes.join(' ');
  }

  checkboxClasses(): string {
    const classes = ['checkbox-input', `checkbox-input--${this.size}`];
    if (this.disabled()) classes.push('checkbox-input--disabled');
    return classes.join(' ');
  }

  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checked.set(target.checked);
    this.onChange(target.checked);
    this.onTouched(target.checked);
  }

  writeValue(value: boolean): void {
    this.checked.set(value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value: boolean) => void): void {
    this.onTouched = fn;
  }
}
