import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tabs">
      <div class="tabs-header">
        <div class="tabs-list">
          <button
            *ngFor="let tab of tabs"
            [class]="getTabClasses(tab)"
            [disabled]="tab.disabled"
            (click)="selectTab(tab.id)"
            class="tab-button"
          >
            <span *ngIf="tab.icon" class="tab-icon">{{ tab.icon }}</span>
            <span class="tab-label">{{ tab.label }}</span>
          </button>
        </div>
      </div>

      <div class="tabs-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Input() tabs: TabItem[] = [];
  @Input() activeTab: string = '';
  @Output() activeTabChange = new EventEmitter<string>();

  getTabClasses(tab: TabItem): string {
    const classes = ['tab-button'];
    if (tab.id === this.activeTab) classes.push('tab-button--active');
    if (tab.disabled) classes.push('tab-button--disabled');
    return classes.join(' ');
  }

  selectTab(tabId: string): void {
    const tab = this.tabs.find(t => t.id === tabId);
    if (tab && !tab.disabled) {
      this.activeTab = tabId;
      this.activeTabChange.emit(tabId);
    }
  }
}
