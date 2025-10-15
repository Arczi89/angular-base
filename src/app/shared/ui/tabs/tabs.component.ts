import { Component, input, model, computed } from '@angular/core';

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  tabs = input<TabItem[]>([]);
  // MODEL dla two-way binding!
  activeTab = model<string>('');

  getTabClasses = computed(() => (tab: TabItem) => {
    const classes = ['tab-button'];
    if (tab.id === this.activeTab()) classes.push('tab-button--active');
    if (tab.disabled) classes.push('tab-button--disabled');
    return classes.join(' ');
  });

  selectTab(tabId: string): void {
    const tab = this.tabs().find(t => t.id === tabId);
    if (tab && !tab.disabled) {
      this.activeTab.set(tabId);
    }
  }
}
