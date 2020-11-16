import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPayrollPage } from './list-payroll.page';

const routes: Routes = [
  {
    path: '',
    component: ListPayrollPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPayrollPageRoutingModule {}
