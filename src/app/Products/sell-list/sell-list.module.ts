import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellListPageRoutingModule } from './sell-list-routing.module';

import { SellListPage } from './sell-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellListPageRoutingModule
  ],
  declarations: [SellListPage]
})
export class SellListPageModule {}
