import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminListCategoryPageRoutingModule } from './admin-list-category-routing.module';

import { AdminListCategoryPage } from './admin-list-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminListCategoryPageRoutingModule
  ],
  declarations: [AdminListCategoryPage]
})
export class AdminListCategoryPageModule {}
