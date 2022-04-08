import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'validator', pathMatch: 'full' },
  {
    path: 'validator',
    loadChildren: () => import('./components/swagger/swagger.module').then(m => m.SwaggerModule),
  },
  {
    path: 'service-provider',
    loadChildren: () => import('./components/swagger/swagger.module').then(m => m.SwaggerModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
