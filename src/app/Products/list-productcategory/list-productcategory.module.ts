import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListProductcategoryPageRoutingModule } from './list-productcategory-routing.module';

import { ListProductcategoryPage } from './list-productcategory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListProductcategoryPageRoutingModule
  ],
  declarations: [ListProductcategoryPage]
})
export class ListProductcategoryPageModule {}
