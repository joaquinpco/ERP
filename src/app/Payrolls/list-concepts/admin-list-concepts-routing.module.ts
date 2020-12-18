import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminListConceptsPage } from './admin-list-concepts.page';

const routes: Routes = [
  {
    path: '',
    component: AdminListConceptsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminListConceptsPageRoutingModule {}
