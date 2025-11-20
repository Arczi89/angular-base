import { ChecklistItem } from 'src/app/shared/components/checklist/checklist.component';

export interface ChecklistState {
  items: ChecklistItem[];
}

export const initialChecklistState: ChecklistState = {
  items: [],
};
