import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SwaggerEditComponent } from './swagger/swagger.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'validator', component: SwaggerEditComponent},
  { path: 'service-provider', component: SwaggerEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
