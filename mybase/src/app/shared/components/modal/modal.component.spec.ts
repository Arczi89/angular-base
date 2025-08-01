import { TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ModalComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ModalComponent, BrowserAnimationsModule],
    })
  );

  it('should create', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should emit close event', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    const component = fixture.componentInstance;

    spyOn(component.close, 'emit');
    component.onClose();

    expect(component.close.emit).toHaveBeenCalled();
  });
});
