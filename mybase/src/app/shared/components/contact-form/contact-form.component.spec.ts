import { TestBed } from '@angular/core/testing';
import { ContactFormComponent } from './contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContactFormComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        ContactFormComponent,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
    })
  );

  it('should create', () => {
    const fixture = TestBed.createComponent(ContactFormComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have a valid form initially', () => {
    const fixture = TestBed.createComponent(ContactFormComponent);
    const component = fixture.componentInstance;
    expect(component.contactForm).toBeTruthy();
    expect(component.contactForm.invalid).toBeTruthy();
  });

  it('should validate required fields', () => {
    const fixture = TestBed.createComponent(ContactFormComponent);
    const component = fixture.componentInstance;

    const nameControl = component.contactForm.get('name');
    const emailControl = component.contactForm.get('email');

    expect(nameControl?.errors?.['required']).toBeTruthy();
    expect(emailControl?.errors?.['required']).toBeTruthy();
  });
});
