import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss']
})
export class FilterTableComponent implements OnInit {
settings: string = ''
  constructor() { }

  ngOnInit(): void {
  }

}
