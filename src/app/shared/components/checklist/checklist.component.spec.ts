import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ChecklistComponent, ChecklistItem } from './checklist.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';

// Mock TranslateLoader
class MockTranslateLoader implements TranslateLoader {
  getTranslation() {
    return of({
      'components.checklist.title': 'Checklist',
      'components.checklist.actions.check-all': 'Check All',
      'components.checklist.actions.uncheck-all': 'Clear All',
    });
  }
}

describe('ChecklistComponent', () => {
  let component: ChecklistComponent;
  let fixture: ComponentFixture<ChecklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ChecklistComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: MockTranslateLoader },
        }),
      ],
    });
    fixture = TestBed.createComponent(ChecklistComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Computed Signals - checkedCount and totalCount', () => {
    it('should calculate checked count correctly using computed signal', () => {
      const testItems: ChecklistItem[] = [
        { id: '1', text: 'Item 1', checked: true },
        { id: '2', text: 'Item 2', checked: false },
        { id: '3', text: 'Item 3', checked: true },
      ];

      component.items.set(testItems);
      fixture.detectChanges();

      expect(component['checkedCount']()).toBe(2);
      expect(component['totalCount']()).toBe(3);
    });

    it('should return 0 for checked count when no items', () => {
      component.items.set([]);
      fixture.detectChanges();

      expect(component['checkedCount']()).toBe(0);
      expect(component['totalCount']()).toBe(0);
    });

    it('should update checkedCount when items change', () => {
      const testItems: ChecklistItem[] = [
        { id: '1', text: 'Item 1', checked: false },
        { id: '2', text: 'Item 2', checked: false },
      ];

      component.items.set(testItems);
      fixture.detectChanges();
      expect(component['checkedCount']()).toBe(0);

      // Zmień stan używając update
      component.items.update(items =>
        items.map((item, i) => (i === 0 ? { ...item, checked: true } : item))
      );
      fixture.detectChanges();
      expect(component['checkedCount']()).toBe(1);
    });

    it('should display correct count in template (2/5 format)', () => {
      const testItems: ChecklistItem[] = [
        { id: '1', text: 'Item 1', checked: true },
        { id: '2', text: 'Item 2', checked: true },
        { id: '3', text: 'Item 3', checked: false },
        { id: '4', text: 'Item 4', checked: false },
        { id: '5', text: 'Item 5', checked: false },
      ];

      component.items.set(testItems);
      fixture.detectChanges();

      const progressElement = fixture.nativeElement.querySelector('.progress');
      expect(progressElement.textContent).toContain('2/5');
    });
  });

  describe('Check All functionality', () => {
    it('should check all items when checkAll is called', () => {
      const testItems: ChecklistItem[] = [
        { id: '1', text: 'Item 1', checked: false },
        { id: '2', text: 'Item 2', checked: false },
        { id: '3', text: 'Item 3', checked: false },
      ];

      component.items.set(testItems);
      fixture.detectChanges();

      component['onCheckAll']();

      expect(component.items().every(item => item.checked)).toBe(true);
      expect(component['checkedCount']()).toBe(3);
    });

    it('should update items signal when check all is called', () => {
      const testItems: ChecklistItem[] = [
        { id: '1', text: 'Item 1', checked: false },
        { id: '2', text: 'Item 2', checked: false },
      ];

      component.items.set(testItems);
      fixture.detectChanges();

      component['onCheckAll']();

      expect(component.items().every(item => item.checked)).toBe(true);
    });

    it('should have Check All button in template', async () => {
      component.items.set([{ id: '1', text: 'Item 1', checked: false }]);
      fixture.detectChanges();
      await fixture.whenStable(); // Czekamy na tłumaczenia

      const buttons = fixture.nativeElement.querySelectorAll('app-button');
      // Szukamy przycisku success (Check All jest success type)
      expect(buttons.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Clear All functionality', () => {
    it('should uncheck all items when clearAll is called', () => {
      const testItems: ChecklistItem[] = [
        { id: '1', text: 'Item 1', checked: true },
        { id: '2', text: 'Item 2', checked: true },
        { id: '3', text: 'Item 3', checked: true },
      ];

      component.items.set(testItems);
      fixture.detectChanges();

      component['onClearAll']();

      expect(component.items().every(item => !item.checked)).toBe(true);
      expect(component['checkedCount']()).toBe(0);
    });

    it('should update items signal when clear all is called', () => {
      const testItems: ChecklistItem[] = [
        { id: '1', text: 'Item 1', checked: true },
        { id: '2', text: 'Item 2', checked: true },
      ];

      component.items.set(testItems);
      fixture.detectChanges();

      component['onClearAll']();

      expect(component.items().every(item => !item.checked)).toBe(true);
    });

    it('should have Clear All button in template', async () => {
      component.items.set([{ id: '1', text: 'Item 1', checked: true }]);
      fixture.detectChanges();
      await fixture.whenStable(); // Czekamy na tłumaczenia

      const buttons = fixture.nativeElement.querySelectorAll('app-button');
      // Powinny być 2 przyciski: Check All i Clear All
      expect(buttons.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Item change functionality', () => {
    it('should toggle item checked state on change', () => {
      const testItem: ChecklistItem = { id: '1', text: 'Test', checked: false };
      component.items.set([testItem]);
      fixture.detectChanges();

      component['onItemChange'](testItem);

      expect(component.items()[0].checked).toBe(true);
    });

    it('should update items signal when individual item is toggled', () => {
      const testItems: ChecklistItem[] = [
        { id: '1', text: 'Item 1', checked: false },
        { id: '2', text: 'Item 2', checked: true },
      ];

      component.items.set(testItems);
      fixture.detectChanges();

      component['onItemChange'](testItems[0]);

      const updatedItems = component.items();
      expect(updatedItems[0].checked).toBe(true);
      expect(updatedItems[1].checked).toBe(true);
    });
  });
});
