import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRrhhPageRoutingModule } from './edit-rrhh-routing.module';

import { EditRrhhPage } from './edit-rrhh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditRrhhPageRoutingModule
  ],
  declarations: [EditRrhhPage]
})
export class EditRrhhPageModule {}
