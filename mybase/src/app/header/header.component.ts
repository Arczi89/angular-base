import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../shared/ui/navbar/navbar.component';
import { ButtonComponent } from '../shared/ui/button/button.component';
import {
  SelectComponent,
  SelectOption,
} from '../shared/ui/select/select.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NavbarComponent,
    ButtonComponent,
    SelectComponent,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  currentLanguage = 'en';
  activePage = 'home';

  languageOptions: SelectOption[] = [
    { value: 'en', label: '🇺🇸 English' },
    { value: 'pl', label: '🇵🇱 Polski' },
  ];

  constructor(private translateService: TranslateService) {
    this.currentLanguage = this.translateService.currentLang || 'en';
  }

  changeLanguage(lang: string): void {
    this.currentLanguage = lang;
    this.translateService.use(lang);
  }

  setActivePage(page: string): void {
    this.activePage = page;
  }

  isActivePage(page: string): boolean {
    return this.activePage === page;
  }
}
