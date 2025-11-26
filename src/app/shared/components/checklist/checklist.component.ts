import { Component, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ButtonComponent } from '../../ui/button/button.component';
import { CheckboxComponent } from '../../ui/checkbox/checkbox.component';
import { CardComponent } from '../../ui/card/card.component';
import { CardHeaderComponent } from '../../ui/card/card-header.component';
import { CardContentComponent } from '../../ui/card/card-content.component';
import { CardActionsComponent } from '../../ui/card/card-actions.component';
import { AppState } from '../../../store/app.state';
import { ChecklistActions } from '../../../store/checklist/checklist.actions';
import { selectChecklistItems } from '../../../store/checklist/checklist.selectors';

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

@Component({
  selector: 'app-checklist',
  imports: [
    CommonModule,
    TranslateModule,
    ButtonComponent,
    CheckboxComponent,
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardActionsComponent,
  ],
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
})
export class ChecklistComponent {
  private store = inject(Store<AppState>);

  readonly items$: Observable<ChecklistItem[]> =
    this.store.select(selectChecklistItems);

  readonly buttonClick = output<ChecklistItem[]>();

  protected readonly checkedCount$: Observable<number> = this.items$.pipe(
    map(items => items.filter(item => item.checked).length)
  );

  protected readonly totalCount$: Observable<number> = this.items$.pipe(
    map(items => items.length)
  );

  protected onItemChange(item: ChecklistItem): void {
    this.store.dispatch(ChecklistActions.toggleItem({ id: item.id }));
  }

  protected onCheckAll(): void {
    this.store.dispatch(ChecklistActions.checkAll());
  }

  protected onClearAll(): void {
    this.store.dispatch(ChecklistActions.uncheckAll());
  }

  protected onSubmit(): void {
    this.items$.pipe(take(1)).subscribe(items => {
      this.buttonClick.emit(items);
    });
  }
}
