import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellListPage } from './sell-list.page';

const routes: Routes = [
  {
    path: '',
    component: SellListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellListPageRoutingModule {}
