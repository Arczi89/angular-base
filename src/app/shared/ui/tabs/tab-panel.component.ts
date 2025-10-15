import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab-panel',
  imports: [CommonModule],
  template: `
    <div class="tab-panel" [class]="panelClasses()">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./tab-panel.component.scss'],
})
export class TabPanelComponent {
  tabId = input<string>('');
  activeTab = input<string>('');

  panelClasses = computed(() => {
    const classes = ['tab-panel'];
    if (this.tabId() === this.activeTab()) {
      classes.push('tab-panel--active');
    }
    return classes.join(' ');
  });
}
