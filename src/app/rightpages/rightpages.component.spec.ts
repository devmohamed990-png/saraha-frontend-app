import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightpagesComponent } from './rightpages.component';

describe('RightpagesComponent', () => {
  let component: RightpagesComponent;
  let fixture: ComponentFixture<RightpagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightpagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
