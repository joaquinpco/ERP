import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminListCategoryPage } from './admin-list-category.page';

const routes: Routes = [
  {
    path: '',
    component: AdminListCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminListCategoryPageRoutingModule {}
