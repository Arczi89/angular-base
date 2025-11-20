import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const LanguageActions = createActionGroup({
  source: 'Language',
  events: {
    'Set Language': props<{ language: string }>(),
    'Load Language From Storage': emptyProps(),
    'Load Language From Storage Success': props<{ language: string }>(),
  },
});
