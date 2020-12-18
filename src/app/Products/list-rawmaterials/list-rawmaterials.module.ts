import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListRawmaterialsPageRoutingModule } from './list-rawmaterials-routing.module';

import { ListRawmaterialsPage } from './list-rawmaterials.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListRawmaterialsPageRoutingModule
  ],
  declarations: [ListRawmaterialsPage]
})
export class ListRawmaterialsPageModule {}
