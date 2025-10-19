import { TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

// Mock TranslateLoader
class MockTranslateLoader implements TranslateLoader {
  getTranslation() {
    return of({});
  }
}

describe('FooterComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        FooterComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: MockTranslateLoader },
        }),
      ],
      providers: [provideRouter([])],
    })
  );

  it('should create', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
