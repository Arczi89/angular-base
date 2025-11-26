import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { selectChecklistItems } from '../store/checklist/checklist.selectors';

class MockTranslateLoader implements TranslateLoader {
  getTranslation() {
    return of({});
  }
}

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: MockTranslateLoader },
        }),
      ],
      providers: [provideMockStore({})],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store) as MockStore;

    store.overrideSelector(selectChecklistItems, []);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
