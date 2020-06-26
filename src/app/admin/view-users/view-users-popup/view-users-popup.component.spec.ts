import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUsersPopupComponent } from './view-users-popup.component';

describe('ViewUsersPopupComponent', () => {
  let component: ViewUsersPopupComponent;
  let fixture: ComponentFixture<ViewUsersPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUsersPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUsersPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
