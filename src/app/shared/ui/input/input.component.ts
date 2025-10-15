import { Component, input, model, computed, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search';
export type InputSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  id = input<string>('');
  label = input<string>();
  placeholder = input<string>('');
  type = input<InputType>('text');
  size = input<InputSize>('medium');
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  error = input<string>();
  hint = input<string>();
  prefix = input<string>();
  suffix = input<string>();
  value = model<string>('');

  private onChange = (value: string) => {};
  private onTouched = () => {};

  wrapperClasses = computed(() => {
    const classes = ['input-wrapper', `input-wrapper--${this.size()}`];
    if (this.error()) classes.push('input-wrapper--error');
    if (this.disabled()) classes.push('input-wrapper--disabled');
    return classes.join(' ');
  });

  inputClasses = computed(() => {
    const classes = ['input-field', `input-field--${this.size()}`];
    if (this.error()) classes.push('input-field--error');
    if (this.disabled()) classes.push('input-field--disabled');
    return classes.join(' ');
  });

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
    this.onChange(target.value);
  }

  onBlur(): void {
    this.onTouched();
  }

  onFocus(): void {}

  writeValue(value: string): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}
}
