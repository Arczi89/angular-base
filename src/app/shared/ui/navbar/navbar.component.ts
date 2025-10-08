import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type NavbarVariant = 'default' | 'elevated' | 'transparent';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  template: `
    <nav class="navbar" [class]="navbarClasses">
      <div class="navbar-container">
        <div class="navbar-brand">
          <ng-content select="[navbar-brand]"></ng-content>
        </div>

        <div class="navbar-menu">
          <ng-content select="[navbar-menu]"></ng-content>
        </div>

        <div class="navbar-actions">
          <ng-content select="[navbar-actions]"></ng-content>
        </div>
      </div>
    </nav>
  `,
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() variant: NavbarVariant = 'default';
  @Input() fixed: boolean = false;

  get navbarClasses(): string {
    const classes = ['navbar', `navbar--${this.variant}`];
    if (this.fixed) classes.push('navbar--fixed');
    return classes.join(' ');
  }
}
