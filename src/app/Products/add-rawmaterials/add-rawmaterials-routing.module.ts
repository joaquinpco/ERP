import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRawmaterialsPage } from './add-rawmaterials.page';

const routes: Routes = [
  {
    path: '',
    component: AddRawmaterialsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRawmaterialsPageRoutingModule {}
