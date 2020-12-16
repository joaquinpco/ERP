import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListReportPageRoutingModule } from './list-report-routing.module';

import { ListReportPage } from './list-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListReportPageRoutingModule
  ],
  declarations: [ListReportPage]
})
export class ListReportPageModule {}
