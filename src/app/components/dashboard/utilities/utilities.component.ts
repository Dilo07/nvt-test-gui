import { MatDatetimePickerInputEvent } from '@angular-material-components/datetime-picker';
import { Component, OnInit } from '@angular/core';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styles: [``]
})
export class UtilitiesComponent implements OnInit {
  public datetransform: string | undefined;
  public panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeDate(evt: MatDatetimePickerInputEvent<any>): void{
    const timeZone = Math.abs(evt.value.getTimezoneOffset());
    console.log(moment(moment(evt.value).utc()).add(timeZone, 'minutes').format());
    this.datetransform = moment(moment(evt.value).utc()).add(timeZone, 'minutes').format();
  }
}
