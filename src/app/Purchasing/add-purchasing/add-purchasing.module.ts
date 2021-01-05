import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPurchasingPageRoutingModule } from './add-purchasing-routing.module';

import { AddPurchasingPage } from './add-purchasing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPurchasingPageRoutingModule
  ],
  declarations: [AddPurchasingPage]
})
export class AddPurchasingPageModule {}
