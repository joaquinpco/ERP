import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAddConceptsPage } from './admin-add-concepts.page';

const routes: Routes = [
  {
    path: '',
    component: AdminAddConceptsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAddConceptsPageRoutingModule {}
