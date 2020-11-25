import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { AddPayrollPageRoutingModule } from './add-payroll-routing.module';

import { AddPayrollPage } from './add-payroll.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPayrollPageRoutingModule
  ],
  declarations: [AddPayrollPage],
  providers: [DatePipe]
})
export class AddPayrollPageModule {}
