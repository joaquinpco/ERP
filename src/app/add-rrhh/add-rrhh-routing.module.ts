import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRrhhPage } from './add-rrhh.page';

const routes: Routes = [
  {
    path: '',
    component: AddRrhhPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRrhhPageRoutingModule {}
