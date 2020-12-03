import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuditsPageRoutingModule } from './audits-routing.module';

import { AuditsPage } from './audits.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuditsPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [AuditsPage]
})
export class AuditsPageModule {}
