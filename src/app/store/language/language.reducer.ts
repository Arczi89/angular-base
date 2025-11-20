import { LanguageActions } from './language.actions';
import { createReducer, on } from '@ngrx/store';
import { initialLanguageState } from './language.state';

export const languageReducer = createReducer(
  initialLanguageState,
  on(LanguageActions.setLanguage, (state, { language }) => ({
    ...state,
    currentLanguage: language,
  })),
  on(LanguageActions.loadLanguageFromStorage, state => ({
    ...state,
    currentLanguage: localStorage.getItem('language') || 'en',
  }))
);
