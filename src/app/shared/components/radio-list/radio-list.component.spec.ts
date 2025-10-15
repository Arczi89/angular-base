import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RadioListComponent, RadioItem } from './radio-list.component';

describe('RadioListComponent', () => {
  let component: RadioListComponent;
  let fixture: ComponentFixture<RadioListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RadioListComponent],
    });
    fixture = TestBed.createComponent(RadioListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Clear selection functionality', () => {
    it('should clear selected value when button text is "Clear selection"', () => {
      const testItems: RadioItem[] = [
        { id: '1', text: 'Option 1', value: 'opt1' },
        { id: '2', text: 'Option 2', value: 'opt2' },
      ];

      fixture.componentRef.setInput('items', testItems);
      fixture.componentRef.setInput('buttonText', 'Clear selection');
      component.selectedValue.set('opt1');
      fixture.detectChanges();

      expect(component.selectedValue()).toBe('opt1');

      component['onButtonClick']();

      expect(component.selectedValue()).toBe('');
    });

    it('should clear selected value when button text is "Wyczyść wybór" (Polish)', () => {
      const testItems: RadioItem[] = [
        { id: '1', text: 'Opcja 1', value: 'opt1' },
      ];

      fixture.componentRef.setInput('items', testItems);
      fixture.componentRef.setInput('buttonText', 'Wyczyść wybór');
      component.selectedValue.set('opt1');
      fixture.detectChanges();

      component['onButtonClick']();

      expect(component.selectedValue()).toBe('');
    });

    it('should NOT clear selection when button text is different', () => {
      const testItems: RadioItem[] = [
        { id: '1', text: 'Option 1', value: 'opt1' },
      ];

      fixture.componentRef.setInput('items', testItems);
      fixture.componentRef.setInput('buttonText', 'Submit');
      component.selectedValue.set('opt1');
      fixture.detectChanges();

      let emittedValue: string | undefined;
      component.buttonClick.subscribe(value => {
        emittedValue = value;
      });

      component['onButtonClick']();

      expect(component.selectedValue()).toBe('opt1');
      expect(emittedValue).toBe('opt1');
    });

    it('should handle clearing when no value is selected', () => {
      const testItems: RadioItem[] = [
        { id: '1', text: 'Option 1', value: 'opt1' },
      ];

      fixture.componentRef.setInput('items', testItems);
      fixture.componentRef.setInput('buttonText', 'Clear selection');
      component.selectedValue.set('');
      fixture.detectChanges();

      expect(() => component['onButtonClick']()).not.toThrow();
      expect(component.selectedValue()).toBe('');
    });
  });

  describe('Selection functionality', () => {
    it('should set selected value when option is selected', () => {
      const testValue = 'option1';

      component['onSelectionChange'](testValue);

      expect(component.selectedValue()).toBe(testValue);
    });

    it('should update selected value when different option is selected', () => {
      component.selectedValue.set('option1');

      component['onSelectionChange']('option2');

      expect(component.selectedValue()).toBe('option2');
    });

    it('should show selection status in template when value is selected', () => {
      const testItems: RadioItem[] = [
        { id: '1', text: 'Option 1', value: 'opt1' },
      ];

      fixture.componentRef.setInput('items', testItems);
      component.selectedValue.set('opt1');
      fixture.detectChanges();

      const statusElement =
        fixture.nativeElement.querySelector('.selection-status');
      expect(statusElement).toBeTruthy();
      expect(statusElement.textContent).toContain('opt1');
    });

    it('should NOT show selection status when no value is selected', () => {
      const testItems: RadioItem[] = [
        { id: '1', text: 'Option 1', value: 'opt1' },
      ];

      fixture.componentRef.setInput('items', testItems);
      component.selectedValue.set('');
      fixture.detectChanges();

      const statusElement =
        fixture.nativeElement.querySelector('.selection-status');
      expect(statusElement).toBeFalsy();
    });
  });

  describe('Button disabled state', () => {
    it('should disable button when no value is selected', () => {
      fixture.componentRef.setInput('buttonText', 'Submit');
      component.selectedValue.set('');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('app-button');
      expect(button.disabled).toBeTruthy();
    });

    it('should enable button when value is selected', () => {
      fixture.componentRef.setInput('buttonText', 'Submit');
      component.selectedValue.set('opt1');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('app-button');
      expect(button.disabled).toBeFalsy();
    });
  });
});
