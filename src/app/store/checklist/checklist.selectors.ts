import { createSelector } from '@ngrx/store';
import { ChecklistState } from './checklist.state';

export const selectChecklistItems = createSelector(
  (state: ChecklistState) => state.items,
  items => items
);
