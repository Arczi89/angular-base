import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../shared/ui/button/button.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonComponent],
  template: `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-section">
            <h3 class="footer-title">
              🎨 {{ 'common.page-name' | translate }}
            </h3>
            <p class="footer-description">
              {{ 'footer.description' | translate }}
            </p>
          </div>

          <div class="footer-section">
            <h4 class="footer-subtitle">{{ 'navigation.home' | translate }}</h4>
            <ul class="footer-links">
              <li>
                <a href="#" class="footer-link">{{
                  'footer.links.home' | translate
                }}</a>
              </li>
              <li>
                <a href="#" class="footer-link">{{
                  'footer.links.about' | translate
                }}</a>
              </li>
              <li>
                <a href="#" class="footer-link">{{
                  'footer.links.contact' | translate
                }}</a>
              </li>
              <li>
                <a href="#" class="footer-link">{{
                  'footer.links.blog' | translate
                }}</a>
              </li>
            </ul>
          </div>

          <div class="footer-section">
            <h4 class="footer-subtitle">
              {{ 'navigation.contact' | translate }}
            </h4>
            <p class="footer-contact">
              📧 {{ 'footer.contact.email' | translate }}<br />
              📞 {{ 'footer.contact.phone' | translate }}<br />
              📍 {{ 'footer.contact.address' | translate }}
            </p>
          </div>

          <div class="footer-section">
            <h4 class="footer-subtitle">
              {{ 'footer.newsletter.title' | translate }}
            </h4>
            <div class="newsletter-form">
              <input
                type="email"
                [placeholder]="'footer.newsletter.placeholder' | translate"
                class="newsletter-input"
              />
              <app-button
                [text]="'footer.newsletter.subscribe' | translate"
                buttonType="primary"
                size="small"
                variant="solid"
              >
              </app-button>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p class="footer-copyright">
            {{ 'footer.copyright' | translate }}
          </p>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {}
