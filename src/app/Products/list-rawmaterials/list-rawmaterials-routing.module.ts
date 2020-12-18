import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListRawmaterialsPage } from './list-rawmaterials.page';

const routes: Routes = [
  {
    path: '',
    component: ListRawmaterialsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRawmaterialsPageRoutingModule {}
