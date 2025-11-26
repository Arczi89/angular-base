import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ChecklistComponent, ChecklistItem } from './checklist.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';
import { initialChecklistState } from 'src/app/store/checklist/checklist.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

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
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ChecklistComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: MockTranslateLoader },
        }),
      ],
      providers: [
        provideMockStore({
          initialState: initialChecklistState,
        }),
      ],
    });
    store = TestBed.inject(Store) as MockStore;
    fixture = TestBed.createComponent(ChecklistComponent);
    component = fixture.componentInstance;
    store.overrideSelector('selectChecklistItems', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
