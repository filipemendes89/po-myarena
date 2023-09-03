import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PeopleModule } from './people/people.module'
import { UnitModule } from './unit/unit.module';

const routes: Routes = [
  { 
    path: 'people', 
    loadChildren: () => PeopleModule
  },
  { 
    path: 'unit', 
    loadChildren: () => UnitModule
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
