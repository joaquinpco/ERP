import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditRawmaterialPage } from './edit-rawmaterial.page';

const routes: Routes = [
  {
    path: '',
    component: EditRawmaterialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRawmaterialPageRoutingModule {}
