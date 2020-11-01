import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRrhhPageRoutingModule } from './add-rrhh-routing.module';

import { AddRrhhPage } from './add-rrhh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRrhhPageRoutingModule
  ],
  declarations: [AddRrhhPage]
})
export class AddRrhhPageModule {}
