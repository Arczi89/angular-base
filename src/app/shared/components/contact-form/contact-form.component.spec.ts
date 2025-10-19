import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactFormComponent } from './contact-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFormComponent, FormsModule, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Czekamy na inicjalizację NgForm
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty model', () => {
    expect(component.model.name).toBe('');
    expect(component.model.email).toBe('');
    expect(component.model.phone).toBe('');
    expect(component.model.subject).toBe('');
    expect(component.model.message).toBe('');
  });

  describe('Form validation', () => {
    it('should be invalid when required fields are empty', async () => {
      await fixture.whenStable();
      expect(component.contactForm.valid).toBe(false);
    });

    it('should be valid when all required fields are filled correctly', async () => {
      component.model.name = 'John Doe';
      component.model.email = 'john@example.com';
      component.model.phone = '+48 123 456 789';
      component.model.subject = 'Test subject';
      component.model.message = 'Test message with at least 10 characters';

      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.contactForm.valid).toBe(true);
    });

    it('should reject name shorter than 2 characters', async () => {
      component.model.name = 'A';
      fixture.detectChanges();
      await fixture.whenStable();

      const nameControl = component.contactForm.controls['name'];
      expect(nameControl?.errors).toBeTruthy();
      expect(nameControl?.errors?.['minlength']).toBeTruthy();
    });

    it('should reject invalid email', async () => {
      component.model.email = 'invalid-email';
      fixture.detectChanges();
      await fixture.whenStable();

      const emailControl = component.contactForm.controls['email'];
      expect(emailControl?.errors).toBeTruthy();
      expect(emailControl?.errors?.['email']).toBeTruthy();
    });

    it('should accept valid phone number with +48 prefix', async () => {
      component.model.phone = '+48 123 456 789';
      fixture.detectChanges();
      await fixture.whenStable();

      const phoneControl = component.contactForm.controls['phone'];
      expect(phoneControl?.errors).toBeFalsy();
    });

    it('should accept empty phone (optional field)', async () => {
      component.model.phone = '';
      fixture.detectChanges();
      await fixture.whenStable();

      const phoneControl = component.contactForm.controls['phone'];
      expect(phoneControl?.valid).toBe(true);
    });

    it('should reject phone with letters', async () => {
      component.model.phone = '123abc789';
      fixture.detectChanges();
      await fixture.whenStable();

      const phoneControl = component.contactForm.controls['phone'];
      expect(phoneControl?.errors).toBeTruthy();
      expect(phoneControl?.errors?.['pattern']).toBeTruthy();
    });

    it('should reject subject shorter than 5 characters', async () => {
      component.model.subject = 'Test';
      fixture.detectChanges();
      await fixture.whenStable();

      const subjectControl = component.contactForm.controls['subject'];
      expect(subjectControl?.errors).toBeTruthy();
      expect(subjectControl?.errors?.['minlength']).toBeTruthy();
    });

    it('should reject message shorter than 10 characters', async () => {
      component.model.message = 'Short';
      fixture.detectChanges();
      await fixture.whenStable();

      const messageControl = component.contactForm.controls['message'];
      expect(messageControl?.errors).toBeTruthy();
      expect(messageControl?.errors?.['minlength']).toBeTruthy();
    });
  });

  describe('Form submission', () => {
    it('should emit formSubmit when form is valid', async () => {
      let emittedData: any;
      component.formSubmit.subscribe(data => {
        emittedData = data;
      });

      component.model.name = 'John Doe';
      component.model.email = 'john@example.com';
      component.model.phone = '+48 123 456 789';
      component.model.subject = 'Test subject';
      component.model.message = 'Test message with enough characters';

      fixture.detectChanges();
      await fixture.whenStable();

      component.onSubmit(component.contactForm);

      expect(emittedData).toBeDefined();
      expect(emittedData.name).toBe('John Doe');
      expect(emittedData.email).toBe('john@example.com');
      expect(emittedData.phone).toBe('+48 123 456 789');
      expect(emittedData.subject).toBe('Test subject');
      expect(emittedData.message).toBe('Test message with enough characters');
    });

    it('should NOT emit formSubmit when form is invalid', async () => {
      let emitted = false;
      component.formSubmit.subscribe(() => {
        emitted = true;
      });

      await fixture.whenStable();
      component.onSubmit(component.contactForm);

      expect(emitted).toBe(false);
    });

    it('should reset form after successful submit', async () => {
      component.model.name = 'John Doe';
      component.model.email = 'john@example.com';
      component.model.subject = 'Test subject';
      component.model.message = 'Test message with enough characters';

      fixture.detectChanges();
      await fixture.whenStable();

      component.onSubmit(component.contactForm);

      expect(component.model.name).toBe('');
      expect(component.model.email).toBe('');
      expect(component.model.phone).toBe('');
      expect(component.model.subject).toBe('');
      expect(component.model.message).toBe('');
    });
  });

  describe('Error messages', () => {
    it('should return name error when field is touched and has required error', async () => {
      await fixture.whenStable();

      const nameControl = component.contactForm.controls['name'];
      nameControl.markAsTouched();

      const error = component.getNameError(nameControl);
      expect(error).toBeDefined();
      expect(error).toContain('required');
    });

    it('should return name error when too short', async () => {
      component.model.name = 'A';
      fixture.detectChanges();
      await fixture.whenStable();

      const nameControl = component.contactForm.controls['name'];
      nameControl.markAsDirty();

      const error = component.getNameError(nameControl);
      expect(error).toBeDefined();
    });

    it('should return email error when invalid', async () => {
      component.model.email = 'invalid';
      fixture.detectChanges();
      await fixture.whenStable();

      const emailControl = component.contactForm.controls['email'];
      emailControl.markAsTouched();

      const error = component.getEmailError(emailControl);
      expect(error).toBeDefined();
    });

    it('should return phone error when invalid format', async () => {
      component.model.phone = 'abc123';
      fixture.detectChanges();
      await fixture.whenStable();

      const phoneControl = component.contactForm.controls['phone'];
      phoneControl.markAsDirty();

      const error = component.getPhoneError(phoneControl);
      expect(error).toBeDefined();
    });

    it('should not show errors when field is pristine', async () => {
      await fixture.whenStable();

      const nameControl = component.contactForm.controls['name'];

      const error = component.getNameError(nameControl);
      expect(error).toBeUndefined();
    });
  });
});
