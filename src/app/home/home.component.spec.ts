import { MockStore } from '@ngrx/store/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { selectChecklistItems } from '../store/checklist/checklist.selectors';
import { ChecklistItem } from '../shared/components/checklist/checklist.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore;

  const MOCK_CHECKLIST_ITEMS: ChecklistItem[] = [
    { id: 'mock1', text: 'Mock Item 1', checked: false },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, TranslateModule.forRoot()],

      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store) as MockStore;

    store.overrideSelector(selectChecklistItems, MOCK_CHECKLIST_ITEMS);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have imageTextConfigs', () => {
    expect(component.imageTextConfigs).toBeDefined();
    expect(component.imageTextConfigs.length).toBeGreaterThan(0);
  });

  it('should have galleryItems', () => {
    expect(component.galleryItems).toBeDefined();
    expect(component.galleryItems.length).toBeGreaterThan(0);
  });

  it('should have checklistItems', async () => {
    expect(component.checklistItems$).toBeDefined();
    expect(
      component.checklistItems$.subscribe(items => {
        expect(items.length).toBeGreaterThan(0);
      })
    );
  });

  it('should have radioItems', () => {
    expect(component.radioItems).toBeDefined();
    expect(component.radioItems.length).toBeGreaterThan(0);
  });

  it('should have tabs', () => {
    expect(component.tabs).toBeDefined();
    expect(component.tabs.length).toBeGreaterThan(0);
  });

  it('should have default activeTab', () => {
    expect(component.activeTab()).toBe('tab1');
  });

  it('should have empty selectedRadioValue initially', () => {
    expect(component.selectedRadioValue()).toBe('');
  });

  it('should have modal closed initially', () => {
    expect(component.isModalOpen()).toBe(false);
  });

  it('should open modal', () => {
    component.openModal();
    expect(component.isModalOpen()).toBe(true);
  });
});
