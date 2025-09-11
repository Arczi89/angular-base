import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../ui/input/input.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { CardComponent } from '../../ui/card/card.component';
import { CardHeaderComponent } from '../../ui/card/card-header.component';
import { CardContentComponent } from '../../ui/card/card-content.component';
import { CardActionsComponent } from '../../ui/card/card-actions.component';

export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardActionsComponent,
  ],
  template: `
    <app-card variant="elevated" padding="large">
      <app-card-header title="Formularz kontaktowy"></app-card-header>

      <app-card-content>
        <form
          [formGroup]="contactForm"
          (ngSubmit)="onSubmit()"
          class="contact-form"
        >
          <div class="form-row">
            <app-input
              id="name"
              label="Imię i nazwisko *"
              placeholder="Wprowadź imię i nazwisko"
              [error]="getFieldError('name')"
              formControlName="name"
            >
            </app-input>

            <app-input
              id="email"
              label="Email *"
              type="email"
              placeholder="Wprowadź email"
              [error]="getFieldError('email')"
              formControlName="email"
            >
            </app-input>
          </div>

          <app-input
            id="phone"
            label="Telefon"
            type="tel"
            placeholder="Wprowadź numer telefonu"
            formControlName="phone"
          >
          </app-input>

          <app-input
            id="subject"
            label="Temat *"
            placeholder="Wprowadź temat"
            [error]="getFieldError('subject')"
            formControlName="subject"
          >
          </app-input>

          <app-input
            id="message"
            label="Wiadomość *"
            placeholder="Wprowadź wiadomość"
            [error]="getFieldError('message')"
            formControlName="message"
          >
          </app-input>
        </form>
      </app-card-content>

      <app-card-actions>
        <app-button
          text="Wyślij wiadomość"
          buttonType="primary"
          size="large"
          variant="solid"
          type="submit"
          (onClick)="onSubmit()"
        >
        </app-button>
      </app-card-actions>
    </app-card>
  `,
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  @Output() formSubmit = new EventEmitter<ContactData>();

  contactForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.valid) {
      this.formSubmit.emit(this.contactForm.value);
      this.contactForm.reset();
      this.submitted = false;
    }
  }

  getFieldError(fieldName: string): string | undefined {
    const field = this.contactForm.get(fieldName);
    if (field && field.errors && this.submitted) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} jest wymagane`;
      }
      if (field.errors['email']) {
        return 'Wprowadź poprawny email';
      }
      if (field.errors['minlength']) {
        const minLength = field.errors['minlength'].requiredLength;
        return `${this.getFieldLabel(fieldName)} musi mieć co najmniej ${minLength} znaki`;
      }
    }
    return undefined;
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Imię i nazwisko',
      email: 'Email',
      subject: 'Temat',
      message: 'Wiadomość',
    };
    return labels[fieldName] || fieldName;
  }

  get f() {
    return this.contactForm.controls;
  }
}
