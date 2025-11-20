import { ChecklistState } from './checklist/checklist.state';
import { LanguageState } from './language/language.state';

export interface AppState {
  checklist: ChecklistState;
  language: LanguageState;
}
