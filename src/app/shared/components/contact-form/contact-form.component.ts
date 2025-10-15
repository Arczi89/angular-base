import { Component, output } from '@angular/core';
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
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  formSubmit = output<ContactData>();

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
        return `${this.getFieldLabel(fieldName)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email';
      }
      if (field.errors['minlength']) {
        const minLength = field.errors['minlength'].requiredLength;
        return `${this.getFieldLabel(fieldName)} must be at least ${minLength} characters`;
      }
    }
    return undefined;
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
    };
    return labels[fieldName] || fieldName;
  }

  get f() {
    return this.contactForm.controls;
  }
}
