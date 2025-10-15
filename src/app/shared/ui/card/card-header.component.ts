import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card-header',
  standalone: true,
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss'],
})
export class CardHeaderComponent {
  title = input<string>();
  subtitle = input<string>();
  avatar = input<string>();
  avatarAlt = input<string>();
  actions = input<boolean>();
}
