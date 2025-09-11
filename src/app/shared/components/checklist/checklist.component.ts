import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    CheckboxComponent,
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardActionsComponent,
  ],
  template: `
    <app-card variant="default" padding="medium">
      <app-card-header title="Checklista" [actions]="true">
        <div card-actions>
          <span class="progress">{{ checkedCount }}/{{ totalCount }}</span>
        </div>
      </app-card-header>

      <app-card-content>
        <div class="checklist-items">
          <div class="checklist-item" *ngFor="let item of items">
            <app-checkbox
              [label]="item.text"
              [checked]="item.checked"
              (checkedChange)="onItemChange(item)"
            >
            </app-checkbox>
          </div>
        </div>
      </app-card-content>

      <app-card-actions>
        <app-button
          [text]="buttonText"
          [buttonType]="buttonColor"
          size="medium"
          variant="solid"
          (onClick)="onButtonClick()"
        >
        </app-button>
      </app-card-actions>
    </app-card>
  `,
  styleUrls: ['./checklist.component.scss'],
})
export class ChecklistComponent {
  @Input() items: ChecklistItem[] = [];
  @Input() buttonText: string = 'Zapisz';
  @Input() buttonColor:
    | 'primary'
    | 'tertiary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info' = 'primary';
  @Output() itemChange = new EventEmitter<ChecklistItem>();
  @Output() buttonClick = new EventEmitter<ChecklistItem[]>();

  onItemChange(item: ChecklistItem): void {
    this.itemChange.emit(item);
  }

  onButtonClick(): void {
    this.buttonClick.emit(this.items);
  }

  get checkedCount(): number {
    return this.items.filter(item => item.checked).length;
  }

  get totalCount(): number {
    return this.items.length;
  }
}
