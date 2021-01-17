import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBankaccountPageRoutingModule } from './add-bankaccount-routing.module';

import { AddBankaccountPage } from './add-bankaccount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBankaccountPageRoutingModule
  ],
  declarations: [AddBankaccountPage]
})
export class AddBankaccountPageModule {}
