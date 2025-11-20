import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChecklistState } from './checklist.state';

export const selectChecklistState =
  createFeatureSelector<ChecklistState>('checklist');

export const selectChecklistItems = createSelector(
  selectChecklistState,
  state => state.items
);
