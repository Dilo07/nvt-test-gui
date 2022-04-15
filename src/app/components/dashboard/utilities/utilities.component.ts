import { MatDatetimePickerInputEvent } from '@angular-material-components/datetime-picker';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as _moment from 'moment';
import { TableSP } from 'src/app/domain/interface';
const moment = _moment;

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styles: [`
  table {
    width: 100%;
  }
  `]
})
export class UtilitiesComponent implements OnInit {
  @Input() validator!: boolean;
  public dateTransform!: string;
  public formGroup!: FormGroup;
  public panelOpenState = false;
  public displayedColumns: string[] = ['nation', 'plate'];
  public dataSource = new MatTableDataSource<TableSP>();
  public dataToDisplay: TableSP[] = [];

  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      ctrlProvId: new FormControl('', Validators.required),
      ctrlCountryCode: new FormControl('IT', Validators.required)
    })
  }

  public changeDate(evt: MatDatetimePickerInputEvent<any>): void {
    const timeZone = Math.abs(evt.value.getTimezoneOffset());
    this.dateTransform = moment(moment(evt.value).utc()).add(timeZone, 'minutes').format();
    /*    let year = String(moment(evt.value).get('year'));
       let mounth = String(moment(evt.value).format('MM'));
       let day = String(moment(evt.value).format('DD'));
       let hours = String(moment(evt.value).get('hours'));
       let minutes = String(moment(evt.value).get('minutes'));
       let seconds = String(moment(evt.value).get('seconds'));
       this.dateTransform = year + mounth + day + hours + minutes + seconds */
  }

  public addRow(): void {
    let row: TableSP = { plate: '', nation: 'IT', selectAdd: true }
    this.dataToDisplay = [...this.dataToDisplay, row]
    this.dataSource.data = this.dataToDisplay;
  }

  public generateXML(): void {
    let countryCode = this.formGroup.get('ctrlCountryCode')?.value;
    let first = countryCode[0].charCodeAt(0).toString(2);
    let second = countryCode[1].charCodeAt(0)
   /*  first.charCodeAt(0).toString(2);
    second.charCodeAt(0) */;
    console.log(first)
  /*   let output = '';
    for (var i = 0; i < countryCode.length; i++) {
      output += countryCode[i].charCodeAt(0).toString(2);
    }
    console.log(output) */
  }
}