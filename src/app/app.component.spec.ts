import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    const mockTranslateService = {
      setDefaultLang: jasmine.createSpy('setDefaultLang'),
      use: jasmine.createSpy('use'),
    };
    component = new AppComponent(mockTranslateService as any);
  });

  it('should have correct title', () => {
    expect(component.title).toEqual('mybase');
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
