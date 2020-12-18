import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminAddConceptsPageRoutingModule } from './admin-add-concepts-routing.module';

import { AdminAddConceptsPage } from './admin-add-concepts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminAddConceptsPageRoutingModule
  ],
  declarations: [AdminAddConceptsPage]
})
export class AdminAddConceptsPageModule {}
