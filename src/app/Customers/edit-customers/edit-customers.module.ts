import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCustomersPageRoutingModule } from './edit-customers-routing.module';

import { EditCustomersPage } from './edit-customers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCustomersPageRoutingModule
  ],
  declarations: [EditCustomersPage]
})
export class EditCustomersPageModule {}
