import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FighterRoutingModule } from './fighter-routing.module';
import { FighterComponent } from './fighter.component';
import { SharedModule } from '../shared/shared.module';
import { FighterListComponent } from './pages/fighter-list/fighter-list.component';
import { FighterService } from './services/fighter.service';
import { FighterFormComponent } from './components/fighter-form/fighter-form.component';
import { CategoryService } from './services/category.service';
import { fighterDetailsComponent } from './pages/fighter-details/fighter-details.component';
import { fighterCardComponent } from './components/fighter-card/fighter-card.component';
//import { fighterFormComponent, FighterFormComponent } from './components/fighter-form/fighter-form.component';


@NgModule({
  declarations: [
    FighterComponent,
    FighterListComponent,
    FighterFormComponent,
    fighterDetailsComponent,
    fighterCardComponent,
    
    
  ],
  imports: [
    CommonModule,
    FighterRoutingModule,
    SharedModule
  ],
  providers:[
    FighterService,
    CategoryService
  ],
})
export class FighterModule { }
