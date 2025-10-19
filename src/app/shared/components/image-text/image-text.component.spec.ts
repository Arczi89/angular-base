import { TestBed } from '@angular/core/testing';
import { ImageTextComponent, ImageTextConfig } from './image-text.component';

describe('ImageTextComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ImageTextComponent],
    })
  );

  it('should create', () => {
    const fixture = TestBed.createComponent(ImageTextComponent);
    const component = fixture.componentInstance;

    // Używamy setInput dla input signals
    fixture.componentRef.setInput('config', {
      imageUrl: 'https://picsum.photos/200/200',
      text: 'Test text',
      layout: 'horizontal',
      imageRatio: '1:1',
    });

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should handle horizontal layout', () => {
    const fixture = TestBed.createComponent(ImageTextComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('config', {
      imageUrl: 'https://picsum.photos/200/200',
      text: 'Test text',
      layout: 'horizontal',
      imageRatio: '1:1',
    });

    fixture.detectChanges();
    expect(component.containerClass()).toBe('container-horizontal');
  });

  it('should handle vertical layout', () => {
    const fixture = TestBed.createComponent(ImageTextComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('config', {
      imageUrl: 'https://picsum.photos/200/200',
      text: 'Test text',
      layout: 'vertical',
      imageRatio: '1:1',
    });

    fixture.detectChanges();
    expect(component.containerClass()).toBe('container-vertical');
  });

  it('should hide image when hideImage is true', () => {
    const fixture = TestBed.createComponent(ImageTextComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('config', {
      imageUrl: 'https://picsum.photos/200/200',
      text: 'Test text',
      layout: 'horizontal',
      hideImage: true,
    });

    fixture.detectChanges();
    expect(component.imageClass()).toBe('hidden');
  });
});
