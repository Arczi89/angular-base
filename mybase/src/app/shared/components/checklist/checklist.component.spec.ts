import { TestBed } from '@angular/core/testing';
import { ChecklistComponent } from './checklist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ChecklistComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ChecklistComponent, BrowserAnimationsModule],
    })
  );

  it('should create', () => {
    const fixture = TestBed.createComponent(ChecklistComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should calculate checked count correctly', () => {
    const fixture = TestBed.createComponent(ChecklistComponent);
    const component = fixture.componentInstance;

    component.items = [
      { id: '1', text: 'Item 1', checked: true },
      { id: '2', text: 'Item 2', checked: false },
      { id: '3', text: 'Item 3', checked: true },
    ];

    expect(component.checkedCount).toBe(2);
    expect(component.totalCount).toBe(3);
  });
});
