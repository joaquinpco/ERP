import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuditsPageRoutingModule } from './audits-routing.module';

import { AuditsPage } from './audits.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuditsPageRoutingModule
  ],
  declarations: [AuditsPage]
})
export class AuditsPageModule {}
