import { Component, input, output, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
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
  imports: [
    CommonModule,
    TranslateModule,
    ButtonComponent,
    RadioComponent,
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardActionsComponent,
  ],
  templateUrl: './radio-list.component.html',
  styleUrls: ['./radio-list.component.scss'],
})
export class RadioListComponent {
  items = input.required<RadioItem[]>();

  // MODEL dla two-way binding!
  selectedValue = model<string>('');

  buttonClick = output<string>();

  onSelectionChange(value: string): void {
    this.selectedValue.set(value);
  }

  onButtonClick(): void {
    this.buttonClick.emit(this.selectedValue());
  }
}
