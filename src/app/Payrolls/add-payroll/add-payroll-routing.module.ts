import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPayrollPage } from './add-payroll.page';

const routes: Routes = [
  {
    path: '',
    component: AddPayrollPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPayrollPageRoutingModule {}
