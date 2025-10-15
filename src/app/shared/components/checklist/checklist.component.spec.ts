import { ChecklistComponent, ChecklistItem } from './checklist.component';

describe('ChecklistComponent', () => {
  let component: ChecklistComponent;

  beforeEach(() => {
    component = new ChecklistComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default buttonText', () => {
    expect(component.buttonText).toBe('Zapisz');
  });

  it('should have default buttonColor', () => {
    expect(component.buttonColor).toBe('primary');
  });

  it('should have empty items array by default', () => {
    expect(component.items).toEqual([]);
  });

  it('should calculate checked count correctly', () => {
    component.items = [
      { id: '1', text: 'Item 1', checked: true },
      { id: '2', text: 'Item 2', checked: false },
      { id: '3', text: 'Item 3', checked: true },
    ];

    expect(component.checkedCount).toBe(2);
    expect(component.totalCount).toBe(3);
  });

  it('should return 0 for checked count when no items', () => {
    component.items = [];
    expect(component.checkedCount).toBe(0);
    expect(component.totalCount).toBe(0);
  });

  it('should emit itemChange event', () => {
    const testItem: ChecklistItem = { id: '1', text: 'Test', checked: true };
    spyOn(component.itemChange, 'emit');

    component.onItemChange(testItem);

    expect(component.itemChange.emit).toHaveBeenCalledWith(testItem);
  });

  it('should emit buttonClick event with all items', () => {
    component.items = [
      { id: '1', text: 'Item 1', checked: true },
      { id: '2', text: 'Item 2', checked: false },
    ];
    spyOn(component.buttonClick, 'emit');

    component.onButtonClick();

    expect(component.buttonClick.emit).toHaveBeenCalledWith(component.items);
  });
});
