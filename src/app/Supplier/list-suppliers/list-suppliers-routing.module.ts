import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListSuppliersPage } from './list-suppliers.page';

const routes: Routes = [
  {
    path: '',
    component: ListSuppliersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListSuppliersPageRoutingModule {}
