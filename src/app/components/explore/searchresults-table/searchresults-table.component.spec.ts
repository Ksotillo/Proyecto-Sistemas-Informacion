import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchresultsTableComponent } from './searchresults-table.component';

describe('SearchresultsTableComponent', () => {
  let component: SearchresultsTableComponent;
  let fixture: ComponentFixture<SearchresultsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchresultsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchresultsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
