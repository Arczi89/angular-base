import { Component, output, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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

export interface ContactFormModel {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact-form',
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
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
  @ViewChild('contactForm') contactForm!: NgForm;

  private translate = inject(TranslateService);

  formSubmit = output<ContactData>();

  model: ContactFormModel = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  };

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.formSubmit.emit({
        name: this.model.name,
        email: this.model.email,
        phone: this.model.phone || undefined,
        subject: this.model.subject,
        message: this.model.message,
      });
      this.resetForm(form);
    }
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.model = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    };
  }

  getNameError(nameControl: any): string | undefined {
    if (nameControl?.errors && (nameControl.dirty || nameControl.touched)) {
      if (nameControl.errors['required']) {
        return this.translate.instant('components.form.errors.name-required');
      }
      if (nameControl.errors['minlength']) {
        return this.translate.instant(
          'components.form.errors.name-min-length',
          { min: 2 }
        );
      }
    }
    return undefined;
  }

  getEmailError(emailControl: any): string | undefined {
    if (emailControl?.errors && (emailControl.dirty || emailControl.touched)) {
      if (emailControl.errors['required']) {
        return this.translate.instant('components.form.errors.email-required');
      }
      if (emailControl.errors['email']) {
        return this.translate.instant('components.form.errors.email-invalid');
      }
    }
    return undefined;
  }

  getPhoneError(phoneControl: any): string | undefined {
    if (phoneControl?.errors && (phoneControl.dirty || phoneControl.touched)) {
      if (phoneControl.errors['pattern']) {
        return this.translate.instant('components.form.errors.phone-invalid');
      }
    }
    return undefined;
  }

  getSubjectError(subjectControl: any): string | undefined {
    if (
      subjectControl?.errors &&
      (subjectControl.dirty || subjectControl.touched)
    ) {
      if (subjectControl.errors['required']) {
        return this.translate.instant(
          'components.form.errors.subject-required'
        );
      }
      if (subjectControl.errors['minlength']) {
        return this.translate.instant(
          'components.form.errors.subject-min-length',
          { min: 5 }
        );
      }
    }
    return undefined;
  }

  getMessageError(messageControl: any): string | undefined {
    if (
      messageControl?.errors &&
      (messageControl.dirty || messageControl.touched)
    ) {
      if (messageControl.errors['required']) {
        return this.translate.instant(
          'components.form.errors.message-required'
        );
      }
      if (messageControl.errors['minlength']) {
        return this.translate.instant(
          'components.form.errors.message-min-length',
          { min: 10 }
        );
      }
    }
    return undefined;
  }
}
