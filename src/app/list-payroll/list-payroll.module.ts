import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPayrollPageRoutingModule } from './list-payroll-routing.module';

import { ListPayrollPage } from './list-payroll.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPayrollPageRoutingModule
  ],
  declarations: [ListPayrollPage]
})
export class ListPayrollPageModule {}
