import { MatDatetimePickerInputEvent } from '@angular-material-components/datetime-picker';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as _moment from 'moment';
import { xml } from 'src/app/domain/functions';
import { TableSP } from 'src/app/domain/interface';
const moment = _moment;

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styles: [`
  table {
    width: 100%;
  }
  .mat-column-id { max-width: 10%}
  .mat-column-nation { max-width: 20%}
  .mat-column-plate { max-width: 20%}
  .mat-column-operation { max-width: 20%}
  .mat-column-delete { max-width: 30%}
  `]
})
export class UtilitiesComponent implements OnInit {
  @Input() validator!: boolean;
  public dateTransform!: string;
  public formGroup!: FormGroup;
  public panelOpenState = false;
  public displayedColumns: string[] = ['id', 'nation', 'plate', 'operation', 'delete'];
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
  }

  public addRow(): void {
    let row: TableSP = { id: this.dataToDisplay.length + 1, plate: '', nation: 'IT', selectAdd: true }
    this.dataToDisplay = [...this.dataToDisplay, row]
    this.dataSource.data = this.dataToDisplay;
  }

  public deleteRow(id: number) : void {
    this.dataToDisplay = this.dataToDisplay.filter((value) => {
      return value.id !== id;
    })
    this.dataSource.data = this.dataToDisplay;
  }

  public generateXML(): void {
    let countryCode = this.formGroup.get('ctrlCountryCode')?.value;
    console.log(xml.generateXml(1,'',this.dataSource.data))
  }
}
