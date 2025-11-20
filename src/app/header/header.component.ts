import {
  Component,
  signal,
  computed,
  inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { NavbarComponent } from '../shared/ui/navbar/navbar.component';
import { ButtonComponent } from '../shared/ui/button/button.component';
import {
  SelectComponent,
  SelectOption,
} from '../shared/ui/select/select.component';
import { AppState } from '../store/app.state';
import { LanguageActions } from '../store/language/language.actions';
import { selectCurrentLanguage } from '../store/language/language.selectors';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    NavbarComponent,
    ButtonComponent,
    SelectComponent,
    TranslateModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private store = inject(Store<AppState>);
  private translateService = inject(TranslateService);
  private languageSubscription?: Subscription;

  currentLanguage$: Observable<string> = this.store.select(
    selectCurrentLanguage
  );
  activePage = signal('home');

  languageOptions: SelectOption[] = [
    { value: 'en', label: '🇺🇸 English' },
    { value: 'pl', label: '🇵🇱 Polski' },
  ];

  ngOnInit(): void {
    this.store.dispatch(LanguageActions.loadLanguageFromStorage());
    this.languageSubscription = this.currentLanguage$.subscribe(language => {
      this.translateService.use(language);
    });
  }

  ngOnDestroy(): void {
    this.languageSubscription?.unsubscribe();
  }

  onLanguageChange(language: string): void {
    this.store.dispatch(LanguageActions.setLanguage({ language }));
  }

  setActivePage(page: string): void {
    this.activePage.set(page);
  }

  isActivePage = computed(() => (page: string) => this.activePage() === page);
}
