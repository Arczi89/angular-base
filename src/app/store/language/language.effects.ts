import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { tap, map } from 'rxjs/operators';
import { LanguageActions } from './language.actions';

@Injectable()
export class LanguageEffects {
  private actions$ = inject(Actions);
  private translateService = inject(TranslateService);

  saveLanguageToStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LanguageActions.setLanguage),
        tap(({ language }) => {
          localStorage.setItem('preferredLanguage', language);
          this.translateService.use(language);
        })
      ),
    { dispatch: false }
  );

  loadLanguageFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguageActions.loadLanguageFromStorage),
      map(() => {
        const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
        return LanguageActions.loadLanguageFromStorageSuccess({
          language: savedLanguage,
        });
      })
    )
  );

  syncTranslateService$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LanguageActions.loadLanguageFromStorageSuccess),
        tap(({ language }) => {
          this.translateService.use(language);
        })
      ),
    { dispatch: false }
  );
}
