import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tab-panel" [class]="panelClasses">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./tab-panel.component.scss'],
})
export class TabPanelComponent {
  @Input() tabId: string = '';
  @Input() activeTab: string = '';

  get panelClasses(): string {
    const classes = ['tab-panel'];
    if (this.tabId === this.activeTab) {
      classes.push('tab-panel--active');
    }
    return classes.join(' ');
  }
}
