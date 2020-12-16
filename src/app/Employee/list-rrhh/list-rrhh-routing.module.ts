import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListRRHHPage } from './list-rrhh.page';

const routes: Routes = [
  {
    path: '',
    component: ListRRHHPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRRHHPageRoutingModule {}
