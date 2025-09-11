import { TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ModalComponent],
    })
  );

  it('should create', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
