import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAccountsPage } from './list-accounts.page';

const routes: Routes = [
  {
    path: '',
    component: ListAccountsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListAccountsPageRoutingModule {}
