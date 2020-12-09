import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'searchresults-table',
  templateUrl: './searchresults-table.component.html',
  styleUrls: ['./searchresults-table.component.scss']
})
export class SearchresultsTableComponent implements OnInit {

  constructor() { }
  @Input() listToDisplay: Array<Product>
  ngOnInit(): void {
  }

}
