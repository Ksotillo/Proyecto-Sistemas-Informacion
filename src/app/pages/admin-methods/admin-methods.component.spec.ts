import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMethodsComponent } from './admin-methods.component';

describe('AdminMethodsComponent', () => {
  let component: AdminMethodsComponent;
  let fixture: ComponentFixture<AdminMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMethodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
