import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwaggerComponent } from './swagger.component';

const routes: Routes = [
  { path: '', redirectTo: 'validator', pathMatch: 'full' },
  { path: 'validator', component: SwaggerComponent },
  { path: 'service-provider', component: SwaggerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwaggerRoutingModule { }
