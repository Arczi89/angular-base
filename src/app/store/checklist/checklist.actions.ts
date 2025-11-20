import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ChecklistItem } from 'src/app/shared/components/checklist/checklist.component';

export const ChecklistActions = createActionGroup({
  source: 'Checklist',
  events: {
    'Initialize Items': props<{ items: ChecklistItem[] }>(),
    'Toggle Item': props<{ item: ChecklistItem }>(),

    'Check All': emptyProps(),
    'Uncheck All': emptyProps(),
  },
});
