import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const SwaggerEditorBundle: any;
declare const SwaggerEditorStandalonePreset: any;

@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.css']
})
export class SwaggerComponent implements OnInit, OnDestroy {
  public editor: any;
  constructor(
    private router: Router
  ) {  }

  ngOnInit(): void {
    let pageUrl = this.router.url;
    this.editor = SwaggerEditorBundle({
      dom_id: '#swagger-editor',
      layout: 'StandaloneLayout',
      presets: [SwaggerEditorStandalonePreset],
      url: pageUrl === '/validator' ? 'assets/files/validator.yaml' : 'assets/files/sp.yaml'
      /* url: 'assets/files/validator.yaml' */
    });
    console.log(this.editor)
  }

  ngOnDestroy(): void {
    this.editor.getConfigs().dom_id = null
    this.editor.getConfigs().layout = null
    this.editor.getConfigs().presets = null
    this.editor.getConfigs().url = null
    console.log(this.editor.getConfigs())
    /* this.router.navigate(['../']) */
  }

}
