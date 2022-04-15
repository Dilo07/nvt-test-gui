import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

declare const SwaggerEditorBundle: any;
declare const SwaggerEditorStandalonePreset: any;

@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styles: [``]
})
export class SwaggerEditComponent implements OnInit {
  public editor: any;
  public isValidator!: boolean;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    let pageUrl = this.router.url;
    this.isValidator = pageUrl === '/swagger/validator';
    this.editor = SwaggerEditorBundle({
      dom_id: '#swagger-editor',
      layout: 'StandaloneLayout',
      presets: [SwaggerEditorStandalonePreset],
      url: pageUrl === '/swagger/validator' ? `assets/files/validator.yaml?T=${moment().valueOf()}` : `assets/files/sp.yaml?T=${moment().valueOf()}`
    });
  }

}
