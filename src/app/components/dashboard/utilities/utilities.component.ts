import { MatDatetimePickerInputEvent } from '@angular-material-components/datetime-picker';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _moment from 'moment';
import { functions } from 'src/app/domain/functions';
import { TableSP } from 'src/app/domain/interface';
import { SnackBar } from 'src/app/domain/snackBar.service';
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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() validator!: boolean;
  public dateTransform!: string;
  public formGroup!: FormGroup;
  public panelOpenState = false;
  public displayedColumns: string[] = ['id', 'nation', 'plate', 'operation', 'delete'];
  public dataSource = new MatTableDataSource<TableSP>();
  public dataToDisplay: TableSP[] = [];
  public xmlGenerate: string = '';
  public numRows = 0;

  constructor(
    private snackBar: SnackBar
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      ctrlProvId: new FormControl('', Validators.required),
      ctrlCountryCode: new FormControl('IT', Validators.required)
    })
  }

  public changeDate(evt: MatDatetimePickerInputEvent<any>): void {
    this.dateTransform = moment(moment(evt.value)).format('yyyy-MM-DDTHH:mm:ssZ')
  }

  public addRow(numRows?: number): void {
    if (numRows && numRows > 0) {
      let row: TableSP[] = [];
      for (let i = 0; i < numRows; i++) {
        row.push({ id: i + 1, plate: '#' + functions.generateRandomPlate(), nation: 'IT', selectAdd: true });
      }
      this.dataToDisplay = row;
      this.dataSource.data = this.dataToDisplay;
      this.dataSource.paginator = this.paginator;
    } else {
      let row: TableSP = { id: this.dataToDisplay.length + 1, plate: '', nation: 'IT', selectAdd: true }
      this.dataToDisplay = [...this.dataToDisplay, row]
      this.dataSource.data = this.dataToDisplay;
      this.dataSource.paginator = this.paginator;
    }
  }

  public deleteRow(id: number): void {
    this.dataToDisplay = this.dataToDisplay.filter((value) => {
      return value.id !== id;
    })
    this.dataSource.data = this.dataToDisplay;
  }

  public generateXML(): void {
    let countryCode = this.formGroup.get('ctrlCountryCode')?.value;
    let prvId = this.formGroup.get('ctrlProvId')?.value
    try{
      this.xmlGenerate = functions.generateXml(prvId, countryCode, this.dataSource.data)
    }catch(error){
      this.snackBar.openSnackBar(String(error), 'ERROR')
    }
  }
}
