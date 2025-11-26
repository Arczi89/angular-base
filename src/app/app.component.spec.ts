import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HomeComponent } from './home/home.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const mockActivatedRoute = {
    params: of({ id: 'testId' }), // Przykładowe parametry
    queryParams: of({ tab: 'details' }),
    snapshot: { paramMap: { get: () => 'testId' } },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TranslateModule.forRoot()],
      providers: [
        provideMockStore({}),
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should have correct title', () => {
    expect(component.title).toEqual('mybase');
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
