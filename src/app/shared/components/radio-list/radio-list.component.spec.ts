import { TestBed } from '@angular/core/testing';
import { RadioListComponent } from './radio-list.component';

describe('RadioListComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RadioListComponent],
    })
  );

  it('should create', () => {
    const fixture = TestBed.createComponent(RadioListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
