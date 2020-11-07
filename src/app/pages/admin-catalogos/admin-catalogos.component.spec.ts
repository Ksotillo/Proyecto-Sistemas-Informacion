import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCatalogosComponent } from './admin-catalogos.component';

describe('AdminCatalogosComponent', () => {
  let component: AdminCatalogosComponent;
  let fixture: ComponentFixture<AdminCatalogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCatalogosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCatalogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
