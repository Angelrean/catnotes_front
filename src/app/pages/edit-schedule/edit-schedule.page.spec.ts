import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditSchedulePage } from './edit-schedule.page';

describe('EditSchedulePage', () => {
  let component: EditSchedulePage;
  let fixture: ComponentFixture<EditSchedulePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
