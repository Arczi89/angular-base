import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../ui/button/button.component';
import { RadioComponent } from '../../ui/radio/radio.component';
import { CardComponent } from '../../ui/card/card.component';
import { CardHeaderComponent } from '../../ui/card/card-header.component';
import { CardContentComponent } from '../../ui/card/card-content.component';
import { CardActionsComponent } from '../../ui/card/card-actions.component';

export interface RadioItem {
  id: string;
  text: string;
  value: string;
}

@Component({
  selector: 'app-radio-list',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    RadioComponent,
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardActionsComponent,
  ],
  template: `
    <app-card variant="default" padding="medium">
      <app-card-header [title]="title" [actions]="true">
        <div card-actions>
          <span class="selection-status" *ngIf="selectedValue">
            Wybrano: {{ selectedValue }}
          </span>
        </div>
      </app-card-header>

      <app-card-content>
        <div class="radio-group">
          <div class="radio-item" *ngFor="let item of items">
            <app-radio
              [name]="'radio-group'"
              [value]="item.value"
              [label]="item.text"
              [checked]="selectedValue === item.value"
              (checkedChange)="onSelectionChange(item.value)"
            >
            </app-radio>
          </div>
        </div>
      </app-card-content>

      <app-card-actions>
        <app-button
          [text]="buttonText"
          [buttonType]="buttonColor"
          size="medium"
          variant="solid"
          [disabled]="!selectedValue"
          (onClick)="onButtonClick()"
        >
        </app-button>
      </app-card-actions>
    </app-card>
  `,
  styleUrls: ['./radio-list.component.scss'],
})
export class RadioListComponent {
  @Input() items: RadioItem[] = [];
  @Input() selectedValue: string = '';
  @Input() buttonText: string = 'Wybierz';
  @Input() buttonColor:
    | 'primary'
    | 'tertiary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info' = 'primary';
  @Input() title: string = 'Wybierz opcję';
  @Output() selectionChange = new EventEmitter<string>();
  @Output() buttonClick = new EventEmitter<string>();

  onSelectionChange(value: string): void {
    this.selectedValue = value;
    this.selectionChange.emit(value);
  }

  onButtonClick(): void {
    this.buttonClick.emit(this.selectedValue);
  }
}
