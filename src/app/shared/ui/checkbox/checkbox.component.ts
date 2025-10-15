import { Component, input, model, computed, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type CheckboxSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-checkbox',
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
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
  label = input<string>();
  size = input<CheckboxSize>('medium');
  disabled = input<boolean>(false);
  checked = model<boolean>(false);

  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  wrapperClasses = computed(() => {
    const classes = ['checkbox-wrapper', `checkbox-wrapper--${this.size()}`];
    if (this.disabled()) classes.push('checkbox-wrapper--disabled');
    return classes.join(' ');
  });

  checkboxClasses = computed(() => {
    const classes = ['checkbox-input', `checkbox-input--${this.size()}`];
    if (this.disabled()) classes.push('checkbox-input--disabled');
    return classes.join(' ');
  });

  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checked.set(target.checked);
    this.onChange(target.checked);
    this.onTouched();
  }

  writeValue(value: boolean): void {
    this.checked.set(value || false);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}
}
