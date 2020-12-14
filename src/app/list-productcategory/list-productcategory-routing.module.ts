import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListProductcategoryPage } from './list-productcategory.page';

const routes: Routes = [
  {
    path: '',
    component: ListProductcategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListProductcategoryPageRoutingModule {}
