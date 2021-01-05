import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPurchasingsPageRoutingModule } from './list-purchasings-routing.module';

import { ListPurchasingsPage } from './list-purchasings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPurchasingsPageRoutingModule
  ],
  declarations: [ListPurchasingsPage]
})
export class ListPurchasingsPageModule {}
