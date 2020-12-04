import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCustomersPage } from './add-customers.page';

const routes: Routes = [
  {
    path: '',
    component: AddCustomersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCustomersPageRoutingModule {}
