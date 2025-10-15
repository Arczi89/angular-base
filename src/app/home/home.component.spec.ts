import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;

  beforeEach(() => {
    component = new HomeComponent();
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

  it('should have checklistItems', () => {
    expect(component.checklistItems).toBeDefined();
    expect(component.checklistItems.length).toBeGreaterThan(0);
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
    expect(component.activeTab).toBe('tab1');
  });

  it('should have empty selectedRadioValue initially', () => {
    expect(component.selectedRadioValue).toBe('');
  });

  it('should have modal closed initially', () => {
    expect(component.isModalOpen).toBe(false);
  });

  it('should open modal', () => {
    component.openModal();
    expect(component.isModalOpen).toBe(true);
  });

  it('should close modal', () => {
    component.openModal();
    component.closeModal();
    expect(component.isModalOpen).toBe(false);
  });

  it('should change active tab', () => {
    const newTabId = 'tab2';
    component.onTabChange(newTabId);
    expect(component.activeTab).toBe(newTabId);
  });
});
