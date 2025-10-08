import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { InputComponent } from '../shared/ui/input/input.component';
import { CheckboxComponent } from '../shared/ui/checkbox/checkbox.component';
import { RadioComponent } from '../shared/ui/radio/radio.component';
import { CardComponent } from '../shared/ui/card/card.component';
import { CardHeaderComponent } from '../shared/ui/card/card-header.component';
import { CardContentComponent } from '../shared/ui/card/card-content.component';
import { CardActionsComponent } from '../shared/ui/card/card-actions.component';
import { NavbarComponent } from '../shared/ui/navbar/navbar.component';
import { TabsComponent } from '../shared/ui/tabs/tabs.component';
import { TabPanelComponent } from '../shared/ui/tabs/tab-panel.component';

import { ImageTextComponent } from '../shared/components/image-text/image-text.component';
import { ImageGalleryComponent } from '../shared/components/image-gallery/image-gallery.component';
import { VideoPlayerComponent } from '../shared/components/video-player/video-player.component';
import { ChecklistComponent } from '../shared/components/checklist/checklist.component';
import { RadioListComponent } from '../shared/components/radio-list/radio-list.component';
import { ContactFormComponent } from '../shared/components/contact-form/contact-form.component';
import { ModalComponent } from '../shared/components/modal/modal.component';

import { ImageTextConfig } from '../shared/components/image-text/image-text.component';
import { GalleryItem } from '../shared/components/image-gallery/image-gallery.component';
import { VideoConfig } from '../shared/components/video-player/video-player.component';
import { ChecklistItem } from '../shared/components/checklist/checklist.component';
import { RadioItem } from '../shared/components/radio-list/radio-list.component';
import { ContactData } from '../shared/components/contact-form/contact-form.component';
import { ModalConfig } from '../shared/components/modal/modal.component';
import { TabItem } from '../shared/ui/tabs/tabs.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ButtonComponent,
    InputComponent,
    CheckboxComponent,
    RadioComponent,
    TabsComponent,
    TabPanelComponent,
    ImageTextComponent,
    ImageGalleryComponent,
    VideoPlayerComponent,
    ChecklistComponent,
    RadioListComponent,
    ContactFormComponent,
    ModalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  imageTextConfigs: ImageTextConfig[] = [
    {
      imageUrl:
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
      text: 'This is sample text next to the image in horizontal layout. You can configure different image and text ratios.',
      layout: 'horizontal',
      imageRatio: '1:1',
    },
    {
      imageUrl:
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      text: 'This is sample text below the image in vertical layout. The component supports different ratios and hiding elements.',
      layout: 'vertical',
      imageRatio: '3:2',
    },
    {
      imageUrl:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      text: 'Example with hidden image - shows only text.',
      layout: 'horizontal',
      hideImage: true,
      imageRatio: '16:9',
    },
  ];

  galleryItems: GalleryItem[] = [
    {
      imageUrl:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
      text: 'Misty forest landscape',
    },
    {
      imageUrl:
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop',
      text: 'Coffee time in nature',
    },
    {
      imageUrl:
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop',
      text: 'Peaceful forest path',
    },
  ];

  videoConfig: VideoConfig = {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    width: '100%',
    height: '300px',
    controls: true,
    poster:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=225&fit=crop',
  };

  checklistItems: ChecklistItem[] = [
    { id: '1', text: 'Prepare presentation', checked: false },
    { id: '2', text: 'Send report', checked: true },
    { id: '3', text: 'Client meeting', checked: false },
    { id: '4', text: 'Update documentation', checked: false },
    { id: '5', text: 'Test application', checked: true },
  ];

  radioItems: RadioItem[] = [
    { id: '1', text: 'Basic option', value: 'basic' },
    { id: '2', text: 'Advanced option', value: 'advanced' },
    { id: '3', text: 'Premium option', value: 'premium' },
    { id: '4', text: 'Custom option', value: 'custom' },
  ];
  selectedRadioValue = '';

  modalConfig: ModalConfig = {
    title: 'Sample Modal',
    imageUrl:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
    text: 'This is sample text in modal with image. Modal supports different configurations and can be used to display additional information.',
    width: '600px',
  };
  isModalOpen = false;

  tabs: TabItem[] = [
    { id: 'tab1', label: 'First Tab', icon: '📄' },
    { id: 'tab2', label: 'Second Tab', icon: '⚙️' },
    { id: 'tab3', label: 'Third Tab', icon: '📊' },
  ];
  activeTab = 'tab1';

  onChecklistChange(item: ChecklistItem): void {
    console.log('Checklist item changed:', item);
    // Here you can add database saving logic
  }

  onChecklistSubmit(items: ChecklistItem[]): void {
    console.log('Checklist submitted:', items);
    alert(
      `Saved ${items.filter(item => item.checked).length} of ${items.length} tasks!`
    );
  }

  onRadioSubmit(value: string): void {
    console.log('Radio submitted:', value);
    alert(`Selected option: ${value}`);
  }

  onContactSubmit(data: ContactData): void {
    console.log('Contact form submitted:', data);
    alert('Thank you for your message! We will respond soon.');
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onTabChange(tabId: string): void {
    this.activeTab = tabId;
  }
}
