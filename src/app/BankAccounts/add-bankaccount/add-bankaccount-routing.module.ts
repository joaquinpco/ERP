import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBankaccountPage } from './add-bankaccount.page';

const routes: Routes = [
  {
    path: '',
    component: AddBankaccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBankaccountPageRoutingModule {}
