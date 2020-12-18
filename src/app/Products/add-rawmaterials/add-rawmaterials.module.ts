import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRawmaterialsPageRoutingModule } from './add-rawmaterials-routing.module';

import { AddRawmaterialsPage } from './add-rawmaterials.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRawmaterialsPageRoutingModule
  ],
  declarations: [AddRawmaterialsPage]
})
export class AddRawmaterialsPageModule {}
