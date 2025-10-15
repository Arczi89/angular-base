import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ContactFormComponent } from './contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ContactFormComponent, ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Phone validation - Polish numbers', () => {
    it('should accept valid Polish phone number with +48 prefix', () => {
      const phoneControl = component['contactForm'].get('phone');

      phoneControl?.setValue('+48 123 456 789');

      expect(phoneControl?.valid).toBe(true);
      expect(phoneControl?.errors).toBeNull();
    });

    it('should accept valid Polish phone number without prefix (9 digits)', () => {
      const phoneControl = component['contactForm'].get('phone');

      phoneControl?.setValue('123456789');

      expect(phoneControl?.valid).toBe(true);
    });

    it('should accept Polish phone with dashes', () => {
      const phoneControl = component['contactForm'].get('phone');

      phoneControl?.setValue('123-456-789');

      expect(phoneControl?.valid).toBe(true);
    });

    it('should accept Polish phone with area code in parentheses', () => {
      const phoneControl = component['contactForm'].get('phone');

      phoneControl?.setValue('(12) 345 67 89');

      expect(phoneControl?.valid).toBe(true);
    });

    it('should reject Polish phone number with less than 9 digits', () => {
      const phoneControl = component['contactForm'].get('phone');

      phoneControl?.setValue('12345678');

      expect(phoneControl?.valid).toBe(false);
      expect(phoneControl?.errors?.['invalidPhone']).toBe(true);
    });
  });

  describe('Phone validation - International numbers', () => {
    it('should accept valid US phone number', () => {
      const phoneControl = component['contactForm'].get('phone');

      phoneControl?.setValue('+1 234 567 8900');

      expect(phoneControl?.valid).toBe(true);
    });

    it('should accept valid UK phone number', () => {
      const phoneControl = component['contactForm'].get('phone');

      phoneControl?.setValue('+44 20 1234 5678');

      expect(phoneControl?.valid).toBe(true);
    });

    it('should accept valid German phone number', () => {
      const phoneControl = component['contactForm'].get('phone');

      phoneControl?.setValue('+49 30 12345678');

      expect(phoneControl?.valid).toBe(true);
    });

    it('should accept valid French phone number', () => {
      const phoneControl = component['contactForm'].get('phone');

      phoneControl?.setValue('+33 1 23 45 67 89');

      expect(phoneControl?.valid).toBe(true);
    });

    it('should reject number with more than 15 digits', () => {
      const phoneControl = component['contactForm'].get('phone');

      phoneControl?.setValue('+1234567890123456');

      expect(phoneControl?.valid).toBe(false);
      expect(phoneControl?.errors?.['invalidPhone']).toBe(true);
    });
  });

  describe('Phone validation - Edge cases', () => {
    it('should accept empty phone (optional field)', () => {
      const phoneControl = component['contactForm'].get('phone');

      phoneControl?.setValue('');

      expect(phoneControl?.valid).toBe(true);
      expect(phoneControl?.errors).toBeNull();
    });

    it('should reject phone with letters', () => {
      const phoneControl = component['contactForm'].get('phone');

      phoneControl?.setValue('123abc789');

      expect(phoneControl?.valid).toBe(false);
    });

    it('should reject phone with special characters', () => {
      const phoneControl = component['contactForm'].get('phone');

      phoneControl?.setValue('123@456#789');

      expect(phoneControl?.valid).toBe(false);
    });

    it('should accept phone with spaces and dashes', () => {
      const phoneControl = component['contactForm'].get('phone');

      phoneControl?.setValue('+48 123-456-789');

      expect(phoneControl?.valid).toBe(true);
    });
  });

  describe('Phone error messages', () => {
    it('should return correct error message for invalid phone', () => {
      component['submitted'] = true;
      const phoneControl = component['contactForm'].get('phone');

      phoneControl?.setValue('123');
      phoneControl?.markAsTouched();

      const errorMessage = component['getFieldError']('phone');

      expect(errorMessage).toBe(
        'Wprowadź poprawny numer telefonu (np. +48 123 456 789 lub 123456789)'
      );
    });

    it('should return undefined when phone is valid', () => {
      component['submitted'] = true;
      const phoneControl = component['contactForm'].get('phone');

      phoneControl?.setValue('+48 123 456 789');

      const errorMessage = component['getFieldError']('phone');

      expect(errorMessage).toBeUndefined();
    });
  });

  describe('Form validation', () => {
    it('should be invalid when required fields are empty', () => {
      expect(component['contactForm'].valid).toBe(false);
    });

    it('should be valid when all required fields are filled correctly', () => {
      component['contactForm'].patchValue({
        name: 'Jan Kowalski',
        email: 'jan@example.com',
        phone: '+48 123 456 789',
        subject: 'Test subject',
        message: 'Test message with at least 10 characters',
      });

      expect(component['contactForm'].valid).toBe(true);
    });

    it('should emit formSubmit when form is valid', () => {
      let emittedData: any;
      component.formSubmit.subscribe(data => {
        emittedData = data;
      });

      component['contactForm'].patchValue({
        name: 'Jan Kowalski',
        email: 'jan@example.com',
        phone: '+48 123 456 789',
        subject: 'Test subject',
        message: 'Test message with enough characters',
      });

      component['onSubmit']();

      expect(emittedData).toBeDefined();
      expect(emittedData.phone).toBe('+48 123 456 789');
    });

    it('should NOT emit formSubmit when form is invalid', () => {
      let emitted = false;
      component.formSubmit.subscribe(() => {
        emitted = true;
      });

      component['onSubmit']();

      expect(emitted).toBe(false);
    });
  });
});
