import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule],
  template: `
    <div class="input-wrapper" [class]="wrapperClasses">
      <label *ngIf="label" [for]="id" class="input-label">{{ label }}</label>
      <div class="input-container">
        <span *ngIf="prefix" class="input-prefix">{{ prefix }}</span>
        <input
          [id]="id"
          [type]="type"
          [placeholder]="placeholder"
          [value]="value"
          [disabled]="disabled"
          [readonly]="readonly"
          [class]="inputClasses"
          (input)="onInput($event)"
          (blur)="onBlur()"
          (focus)="onFocus()"
          class="input-field"
        />
        <span *ngIf="suffix" class="input-suffix">{{ suffix }}</span>
      </div>
      <div *ngIf="error" class="input-error">{{ error }}</div>
      <div *ngIf="hint" class="input-hint">{{ hint }}</div>
    </div>
  `,
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
  @Input() id: string = '';
  @Input() label?: string;
  @Input() placeholder: string = '';
  @Input() type: InputType = 'text';
  @Input() size: InputSize = 'medium';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() error?: string;
  @Input() hint?: string;
  @Input() prefix?: string;
  @Input() suffix?: string;
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  private onChange = (value: string) => {};
  private onTouched = () => {};

  get wrapperClasses(): string {
    const classes = ['input-wrapper', `input-wrapper--${this.size}`];
    if (this.error) classes.push('input-wrapper--error');
    if (this.disabled) classes.push('input-wrapper--disabled');
    return classes.join(' ');
  }

  get inputClasses(): string {
    const classes = ['input-field', `input-field--${this.size}`];
    if (this.error) classes.push('input-field--error');
    if (this.disabled) classes.push('input-field--disabled');
    return classes.join(' ');
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }

  onFocus(): void {}

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
}
