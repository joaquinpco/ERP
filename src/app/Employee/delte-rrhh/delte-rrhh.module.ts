import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DelteRrhhPageRoutingModule } from './delte-rrhh-routing.module';

import { DelteRrhhPage } from './delte-rrhh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DelteRrhhPageRoutingModule
  ],
  declarations: [DelteRrhhPage]
})
export class DelteRrhhPageModule {}
