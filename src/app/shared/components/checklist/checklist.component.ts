import { Component, model, output, computed } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { CheckboxComponent } from '../../ui/checkbox/checkbox.component';
import { CardComponent } from '../../ui/card/card.component';
import { CardHeaderComponent } from '../../ui/card/card-header.component';
import { CardContentComponent } from '../../ui/card/card-content.component';
import { CardActionsComponent } from '../../ui/card/card-actions.component';

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

@Component({
  selector: 'app-checklist',
  imports: [
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
  readonly items = model<ChecklistItem[]>([]);
  readonly buttonClick = output<ChecklistItem[]>();

  protected readonly checkedCount = computed(
    () => this.items().filter(item => item.checked).length
  );

  protected readonly totalCount = computed(() => this.items().length);

  protected onItemChange(item: ChecklistItem): void {
    this.items.update(currentItems =>
      currentItems.map(i =>
        i.id === item.id ? { ...item, checked: !item.checked } : i
      )
    );
  }

  protected onCheckAll(): void {
    this.items.update(currentItems =>
      currentItems.map(item => ({ ...item, checked: true }))
    );
  }

  protected onClearAll(): void {
    this.items.update(currentItems =>
      currentItems.map(item => ({ ...item, checked: false }))
    );
  }
}
