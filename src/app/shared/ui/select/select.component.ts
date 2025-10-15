import {
  Component,
  input,
  output,
  model,
  computed,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-select',
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  options = input<SelectOption[]>([]);
  placeholder = input<string>('Select an option');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  label = input<string>('');
  error = input<string>('');
  size = input<'small' | 'medium' | 'large'>('medium');
  variant = input<'outlined' | 'filled' | 'standard'>('outlined');

  value = model<string>('');

  isOpen = false;
  focused = false;

  private onChange = (value: string) => {};
  private onTouched = () => {};

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

  toggleDropdown(): void {
    if (!this.disabled()) {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.focused = true;
      }
    }
  }

  selectOption(option: SelectOption): void {
    if (!option.disabled) {
      this.value.set(option.value);
      this.isOpen = false;
      this.focused = false;
      this.onChange(option.value);
      this.onTouched();
    }
  }

  onBlur(): void {
    this.focused = false;
    this.onTouched();
  }

  getSelectedOption(): SelectOption | undefined {
    return this.options().find(option => option.value === this.value());
  }

  getDisplayValue(): string {
    const selectedOption = this.getSelectedOption();
    return selectedOption ? selectedOption.label : this.placeholder();
  }

  isOptionSelected(option: SelectOption): boolean {
    return option.value === this.value();
  }
}
