import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type NavbarVariant = 'default' | 'elevated' | 'transparent';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  variant = input<NavbarVariant>('default');
  fixed = input<boolean>(false);

  navbarClasses = computed(() => {
    const classes = ['navbar', `navbar--${this.variant()}`];
    if (this.fixed()) classes.push('navbar--fixed');
    return classes.join(' ');
  });
}
