import { Component, input, output, model } from '@angular/core';
import { ButtonComponent, ButtonType } from '../../ui/button/button.component';
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
  imports: [
    ButtonComponent,
    RadioComponent,
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardActionsComponent,
  ],
  template: `
    <app-card variant="default" padding="medium">
      <app-card-header [title]="title()" [actions]="true">
        <div card-actions>
          @if (selectedValue()) {
            <span class="selection-status">
              Wybrano: {{ selectedValue() }}
            </span>
          }
        </div>
      </app-card-header>

      <app-card-content>
        <div class="radio-group">
          @for (item of items(); track item.id) {
            <div class="radio-item">
              <app-radio
                [name]="'radio-group'"
                [value]="item.value"
                [label]="item.text"
                [checked]="selectedValue() === item.value"
              >
              </app-radio>
            </div>
          }
        </div>
      </app-card-content>

      <app-card-actions>
        <app-button
          [text]="buttonText()"
          [buttonType]="buttonColor()"
          size="medium"
          variant="solid"
          [disabled]="!selectedValue()"
          (onClick)="onButtonClick()"
        >
        </app-button>
      </app-card-actions>
    </app-card>
  `,
  styleUrls: ['./radio-list.component.scss'],
  standalone: true,
})
export class RadioListComponent {
  items = input<RadioItem[]>([]);
  selectedValue = model<string>('');
  buttonText = input<string>('Wybierz');
  buttonColor = input<ButtonType>('primary');
  title = input<string>('Wybierz opcję');
  buttonClick = output<string>();

  onSelectionChange(value: string): void {
    this.selectedValue.set(value);
  }

  onButtonClick(): void {
    this.buttonClick.emit(this.selectedValue());
  }
}
