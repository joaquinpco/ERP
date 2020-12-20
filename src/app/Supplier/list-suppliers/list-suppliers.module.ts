import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListSuppliersPageRoutingModule } from './list-suppliers-routing.module';

import { ListSuppliersPage } from './list-suppliers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListSuppliersPageRoutingModule
  ],
  declarations: [ListSuppliersPage]
})
export class ListSuppliersPageModule {}
