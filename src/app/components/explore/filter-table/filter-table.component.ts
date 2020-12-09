import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss']
})
export class FilterTableComponent implements OnInit {
@Input() category: string
@Output() settingsOUT = new EventEmitter<string>()
  settings: string = ''
  constructor() { }

  ngOnInit(): void {
  }

  sendSettings(str: string){
    console.log('O m g ')
    this.settingsOUT.emit(str)
    this.settings = str
  }
  pSettings(){

  }
}
