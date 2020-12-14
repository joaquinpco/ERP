import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProductcategoryPage } from './add-productcategory.page';

const routes: Routes = [
  {
    path: '',
    component: AddProductcategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddProductcategoryPageRoutingModule {}
