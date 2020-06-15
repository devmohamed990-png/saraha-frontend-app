import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankingComponent } from './thanking.component';

describe('ThankingComponent', () => {
  let component: ThankingComponent;
  let fixture: ComponentFixture<ThankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
