import { TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

describe('HeaderComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
          defaultLanguage: 'en',
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      providers: [provideHttpClient(withInterceptorsFromDi())],
    })
  );

  it('should create', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
