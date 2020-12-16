import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProductcategoryPageRoutingModule } from './add-productcategory-routing.module';

import { AddProductcategoryPage } from './add-productcategory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddProductcategoryPageRoutingModule
  ],
  declarations: [AddProductcategoryPage]
})
export class AddProductcategoryPageModule {}
