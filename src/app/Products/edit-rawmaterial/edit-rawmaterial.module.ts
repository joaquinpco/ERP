import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRawmaterialPageRoutingModule } from './edit-rawmaterial-routing.module';

import { EditRawmaterialPage } from './edit-rawmaterial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditRawmaterialPageRoutingModule
  ],
  declarations: [EditRawmaterialPage]
})
export class EditRawmaterialPageModule {}
