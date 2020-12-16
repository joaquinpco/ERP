import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCustomersPage } from './edit-customers.page';

const routes: Routes = [
  {
    path: '',
    component: EditCustomersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCustomersPageRoutingModule {}
