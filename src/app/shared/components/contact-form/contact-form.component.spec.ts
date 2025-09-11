import { TestBed } from '@angular/core/testing';
import { ContactFormComponent } from './contact-form.component';

describe('ContactFormComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ContactFormComponent],
    })
  );

  it('should create', () => {
    const fixture = TestBed.createComponent(ContactFormComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
