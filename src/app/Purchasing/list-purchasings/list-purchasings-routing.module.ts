import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPurchasingsPage } from './list-purchasings.page';

const routes: Routes = [
  {
    path: '',
    component: ListPurchasingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPurchasingsPageRoutingModule {}
