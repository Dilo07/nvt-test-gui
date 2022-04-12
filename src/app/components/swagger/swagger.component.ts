import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const SwaggerEditorBundle: any;
declare const SwaggerEditorStandalonePreset: any;

@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.css']
})
export class SwaggerComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    let pageUrl = this.router.url;
    const editor = SwaggerEditorBundle({
      dom_id: '#swagger-editor',
      layout: 'StandaloneLayout',
      presets: [SwaggerEditorStandalonePreset],
      url: pageUrl === '/validator' ? 'assets/files/validator.yaml' : 'assets/files/sp.yaml'
    });
  }

}
