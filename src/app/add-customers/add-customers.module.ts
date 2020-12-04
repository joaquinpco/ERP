import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCustomersPageRoutingModule } from './add-customers-routing.module';

import { AddCustomersPage } from './add-customers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCustomersPageRoutingModule
  ],
  declarations: [AddCustomersPage]
})
export class AddCustomersPageModule {}
