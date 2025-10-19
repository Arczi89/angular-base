import { Component, signal, computed, inject, effect } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from '../shared/ui/navbar/navbar.component';
import { ButtonComponent } from '../shared/ui/button/button.component';
import {
  SelectComponent,
  SelectOption,
} from '../shared/ui/select/select.component';

@Component({
  selector: 'app-header',
  imports: [NavbarComponent, ButtonComponent, SelectComponent, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private translateService = inject(TranslateService);

  currentLanguage = signal(this.translateService.currentLang || 'en');
  activePage = signal('home');

  languageOptions: SelectOption[] = [
    { value: 'en', label: '🇺🇸 English' },
    { value: 'pl', label: '🇵🇱 Polski' },
  ];

  constructor() {
    effect(() => {
      this.translateService.use(this.currentLanguage());
    });
  }

  setActivePage(page: string): void {
    this.activePage.set(page);
  }

  isActivePage = computed(() => (page: string) => this.activePage() === page);
}
