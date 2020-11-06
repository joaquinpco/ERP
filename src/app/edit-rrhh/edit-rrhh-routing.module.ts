import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditRrhhPage } from './edit-rrhh.page';

const routes: Routes = [
  {
    path: '',
    component: EditRrhhPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRrhhPageRoutingModule {}
