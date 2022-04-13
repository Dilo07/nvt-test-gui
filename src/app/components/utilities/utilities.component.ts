import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styles: [`
  
  `
  ]
})
export class UtilitiesComponent implements OnInit {
  public CtrlDateSelection: Date | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
