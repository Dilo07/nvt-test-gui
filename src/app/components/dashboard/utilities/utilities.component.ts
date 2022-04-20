import { MatDatetimePickerInputEvent } from '@angular-material-components/datetime-picker';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _moment from 'moment';
import { of, Subscription } from 'rxjs';
import { delay } from "rxjs/operators";
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
  public complete = true;

  constructor(
    private snackBar: SnackBar,
    private cdr: ChangeDetectorRef
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
    this.complete = false;
    let subscription: Subscription;
    let async = of(null).pipe(delay(200));
    subscription = async.subscribe({
      next: () => {
        if (numRows && numRows > 0) {
          let row: TableSP[] = [];
          for (let i = 0; i < numRows; i++) {
            let randomPlate = functions.generateRandomPlate();
            while(row.some((rowCheck) => rowCheck.plate ===  randomPlate)){ // se ha generato una targa già presente richiama il random
              randomPlate = functions.generateRandomPlate();
            }
            row.push({ id: i + 1, plate: randomPlate, nation: 'IT', selectAdd: true });
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
      },
      complete: () => {this.complete = true, this.xmlGenerate = ''; subscription.unsubscribe()}
    })
  }

  public deleteRow(id: number): void {
    this.dataToDisplay = this.dataToDisplay.filter((value) => {
      return value.id !== id;
    })
    this.dataSource.data = this.dataToDisplay;
  }

  public generateXML(): void {
    this.complete = false;
    let async = of(null).pipe(delay(200))
    let subscription: Subscription;
    let countryCode = this.formGroup.get('ctrlCountryCode')?.value;
    let prvId = this.formGroup.get('ctrlProvId')?.value;
    subscription = async.subscribe({
      next: () => {
        try {
          this.xmlGenerate = functions.generateXml(prvId, countryCode, this.dataSource.data)
        } catch (error) {
          this.snackBar.openSnackBar(String(error), 'ERROR')
        }
      },
      complete: () => {this.complete = true, subscription.unsubscribe()}
    })
  }
}
