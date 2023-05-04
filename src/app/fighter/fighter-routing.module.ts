import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FighterListComponent } from './pages/fighter-list/fighter-list.component';
import { fighterDetailsComponent } from './pages/fighter-details/fighter-details.component';

const routes: Routes = [
  {
    path: '',
    component: FighterListComponent
  },
  {
    path: ':id',
    component: fighterDetailsComponent
  }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FighterRoutingModule { }
