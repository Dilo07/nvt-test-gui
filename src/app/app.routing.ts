import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/swagger/swagger.module').then(m => m.SwaggerModule),
  },
  {
    path: 'utilities',
    loadChildren: () => import('./components/utilities/utilities.module').then(m => m.UtilitiesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
