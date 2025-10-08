import {
  Component,
  Input,
  Output,
  EventEmitter,
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
  @Input() options: SelectOption[] = [];
  @Input() placeholder = 'Select an option';
  @Input() disabled = false;
  @Input() required = false;
  @Input() label = '';
  @Input() error = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() variant: 'outlined' | 'filled' | 'standard' = 'outlined';

  @Output() selectionChange = new EventEmitter<string>();

  value: string = '';
  isOpen = false;
  focused = false;

  private onChange = (value: string) => {};
  private onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggleDropdown(): void {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.focused = true;
      }
    }
  }

  selectOption(option: SelectOption): void {
    if (!option.disabled) {
      this.value = option.value;
      this.isOpen = false;
      this.focused = false;
      this.onChange(this.value);
      this.onTouched();
      this.selectionChange.emit(this.value);
    }
  }

  onBlur(): void {
    this.focused = false;
    this.onTouched();
  }

  getSelectedOption(): SelectOption | undefined {
    return this.options.find(option => option.value === this.value);
  }

  getDisplayValue(): string {
    const selectedOption = this.getSelectedOption();
    return selectedOption ? selectedOption.label : this.placeholder;
  }

  isOptionSelected(option: SelectOption): boolean {
    return option.value === this.value;
  }
}
