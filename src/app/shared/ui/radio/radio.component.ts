import { Component, input, model, computed, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type RadioSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-radio',
  standalone: true,
  templateUrl: './radio.component.html',
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
  name = input<string>('');
  value = input<string>('');
  label = input<string>();
  size = input<RadioSize>('medium');
  disabled = input<boolean>(false);
  checked = model<boolean>(false);

  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  wrapperClasses = computed(() => {
    const classes = ['radio-wrapper', `radio-wrapper--${this.size()}`];
    if (this.disabled()) classes.push('radio-wrapper--disabled');
    return classes.join(' ');
  });

  radioClasses = computed(() => {
    const classes = ['radio-input', `radio-input--${this.size()}`];
    if (this.disabled()) classes.push('radio-input--disabled');
    return classes.join(' ');
  });

  onRadioChange(event: Event): void {
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
