import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Categories } from 'src/app/models/categories';

@Component({
  selector: 'app-admin-side',
  templateUrl: './admin-side.component.html',
  styleUrls: ['./admin-side.component.scss']
})
export class AdminSideComponent implements OnInit {
current: Categories;
@Output() currentCategoryOUT = new EventEmitter<Categories>();
@Input() categories: Array<Categories>;

  constructor( ) { }

  ngOnInit(): void {
  }
  showCurrent(selected: Categories){
    if(this.currentCategoryOUT){
    this.currentCategoryOUT.emit(selected);}
    this.current = selected;
  }
}
