import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPurchasingPage } from './add-purchasing.page';

const routes: Routes = [
  {
    path: '',
    component: AddPurchasingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPurchasingPageRoutingModule {}
