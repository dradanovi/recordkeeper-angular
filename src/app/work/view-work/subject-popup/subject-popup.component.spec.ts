import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectPopupComponent } from './subject-popup.component';

describe('SubjectPopupComponent', () => {
  let component: SubjectPopupComponent;
  let fixture: ComponentFixture<SubjectPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
