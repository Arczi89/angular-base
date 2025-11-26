import { ChecklistActions } from './checklist.actions';
import { createReducer, on } from '@ngrx/store';
import { initialChecklistState } from './checklist.state';

export const checklistReducer = createReducer(
  initialChecklistState,
  on(ChecklistActions.initializeItems, (state, { items }) => ({
    ...state,
    items,
  })),
  on(ChecklistActions.toggleItem, (state, { id }) => ({
    ...state,
    items: state.items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ),
  })),
  on(ChecklistActions.checkAll, state => ({
    ...state,
    items: state.items.map(item => ({ ...item, checked: true })),
  })),
  on(ChecklistActions.uncheckAll, state => ({
    ...state,
    items: state.items.map(item => ({ ...item, checked: false })),
  }))
);
