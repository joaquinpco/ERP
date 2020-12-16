import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListRRHHPageRoutingModule } from './list-rrhh-routing.module';

import { ListRRHHPage } from './list-rrhh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListRRHHPageRoutingModule
  ],
  declarations: [ListRRHHPage]
})
export class ListRRHHPageModule {}
