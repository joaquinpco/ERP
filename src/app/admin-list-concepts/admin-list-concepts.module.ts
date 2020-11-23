import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminListConceptsPageRoutingModule } from './admin-list-concepts-routing.module';

import { AdminListConceptsPage } from './admin-list-concepts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminListConceptsPageRoutingModule
  ],
  declarations: [AdminListConceptsPage]
})
export class AdminListConceptsPageModule {}
