import { TestBed } from '@angular/core/testing';
import { RadioListComponent } from './radio-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RadioListComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RadioListComponent, BrowserAnimationsModule],
    })
  );

  it('should create', () => {
    const fixture = TestBed.createComponent(RadioListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should handle selection change', () => {
    const fixture = TestBed.createComponent(RadioListComponent);
    const component = fixture.componentInstance;

    component.items = [
      { id: '1', text: 'Option 1', value: 'option1' },
      { id: '2', text: 'Option 2', value: 'option2' },
    ];

    component.onSelectionChange('option1');
    expect(component.selectedValue).toBe('option1');
  });
});
