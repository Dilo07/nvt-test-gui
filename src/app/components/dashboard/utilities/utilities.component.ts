import { MatDatetimePickerInputEvent } from '@angular-material-components/datetime-picker';
import { Component, OnInit } from '@angular/core';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styles: [``]
})
export class UtilitiesComponent {
  public dateTransform!: string;
  public panelOpenState = false;

  constructor() { }

  changeDate(evt: MatDatetimePickerInputEvent<any>): void{
    const timeZone = Math.abs(evt.value.getTimezoneOffset());
    this.dateTransform = moment(moment(evt.value).utc()).add(timeZone, 'minutes').format();
  }
}
