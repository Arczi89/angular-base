import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ModalComponent, ModalConfig } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalComponent],
    });
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Modal visibility', () => {
    it('should NOT display modal when isOpen is false', () => {
      fixture.componentRef.setInput('isOpen', false);
      fixture.detectChanges();

      const backdrop = fixture.nativeElement.querySelector('.modal-backdrop');
      expect(backdrop).toBeFalsy();
    });

    it('should display modal when isOpen is true', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      const backdrop = fixture.nativeElement.querySelector('.modal-backdrop');
      expect(backdrop).toBeTruthy();
    });
  });

  describe('Close button (X) functionality', () => {
    it('should have close button with X symbol', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      const closeButton = fixture.nativeElement.querySelector('.close-button');
      expect(closeButton).toBeTruthy();
      expect(closeButton.textContent).toContain('✕');
    });

    it('should emit close event when close button is clicked', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      let closeEmitted = false;
      component.close.subscribe(() => {
        closeEmitted = true;
      });

      component['onClose']();

      expect(closeEmitted).toBe(true);
    });

    it('should close button be in modal header', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      const modalHeader = fixture.nativeElement.querySelector('.modal-header');
      const closeButton = modalHeader?.querySelector('.close-button');

      expect(closeButton).toBeTruthy();
    });
  });

  describe('Click outside modal behavior', () => {
    it('should NOT close when clicking on backdrop', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      let closeEmitted = false;
      component.close.subscribe(() => {
        closeEmitted = true;
      });

      const event = new Event('click');
      component['onBackdropClick'](event);

      expect(closeEmitted).toBe(false);
    });

    it('should stop event propagation when clicking backdrop', () => {
      const event = new Event('click');
      spyOn(event, 'stopPropagation');

      component['onBackdropClick'](event);

      expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('should NOT close modal when clicking inside modal container', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      let closeEmitted = false;
      component.close.subscribe(() => {
        closeEmitted = true;
      });

      const modalContainer =
        fixture.nativeElement.querySelector('.modal-container');
      modalContainer?.click();

      expect(closeEmitted).toBe(false);
    });
  });

  describe('Z-index and stacking', () => {
    it('should have high z-index for backdrop', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      const backdrop = fixture.nativeElement.querySelector('.modal-backdrop');
      const computedStyle = window.getComputedStyle(backdrop);

      // Z-index powinien być ustawiony (sprawdzamy czy nie jest 'auto')
      expect(computedStyle.zIndex).not.toBe('auto');
      expect(computedStyle.zIndex).not.toBe('0');
    });

    it('should have even higher z-index for modal container', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      const modalContainer =
        fixture.nativeElement.querySelector('.modal-container');
      const computedStyle = window.getComputedStyle(modalContainer);

      expect(computedStyle.zIndex).not.toBe('auto');
      expect(computedStyle.zIndex).not.toBe('0');
    });

    it('should have position fixed for backdrop', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      const backdrop = fixture.nativeElement.querySelector('.modal-backdrop');
      const computedStyle = window.getComputedStyle(backdrop);

      expect(computedStyle.position).toBe('fixed');
    });
  });

  describe('Modal content', () => {
    it('should display modal title', () => {
      const testConfig: ModalConfig = {
        title: 'Test Modal Title',
      };
      fixture.componentRef.setInput('config', testConfig);
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      const title = fixture.nativeElement.querySelector('.modal-title');
      expect(title.textContent).toContain('Test Modal Title');
    });

    it('should display image when imageUrl is provided', () => {
      const testConfig: ModalConfig = {
        title: 'Test',
        imageUrl: 'https://example.com/image.jpg',
      };
      fixture.componentRef.setInput('config', testConfig);
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      const image = fixture.nativeElement.querySelector('.modal-image img');
      expect(image).toBeTruthy();
      expect(image.src).toContain('example.com/image.jpg');
    });

    it('should display text when text is provided', () => {
      const testConfig: ModalConfig = {
        title: 'Test',
        text: 'This is test modal text',
      };
      fixture.componentRef.setInput('config', testConfig);
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      const text = fixture.nativeElement.querySelector('.modal-text p');
      expect(text.textContent).toContain('This is test modal text');
    });

    it('should hide image when hideImage is true', () => {
      const testConfig: ModalConfig = {
        title: 'Test',
        imageUrl: 'https://example.com/image.jpg',
        hideImage: true,
      };
      fixture.componentRef.setInput('config', testConfig);
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      const image = fixture.nativeElement.querySelector('.modal-image');
      expect(image).toBeFalsy();
    });

    it('should hide text when hideText is true', () => {
      const testConfig: ModalConfig = {
        title: 'Test',
        text: 'This is test text',
        hideText: true,
      };
      fixture.componentRef.setInput('config', testConfig);
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      const text = fixture.nativeElement.querySelector('.modal-text');
      expect(text).toBeFalsy();
    });

    it('should apply custom width from config', () => {
      const testConfig: ModalConfig = {
        title: 'Test',
        width: '800px',
      };
      fixture.componentRef.setInput('config', testConfig);
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      const modalContainer =
        fixture.nativeElement.querySelector('.modal-container');
      expect(modalContainer.style.width).toBe('800px');
    });

    it('should apply custom height from config', () => {
      const testConfig: ModalConfig = {
        title: 'Test',
        height: '600px',
      };
      fixture.componentRef.setInput('config', testConfig);
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      const modalContainer =
        fixture.nativeElement.querySelector('.modal-container');
      expect(modalContainer.style.height).toBe('600px');
    });
  });
});
