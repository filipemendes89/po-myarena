import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CourtModule } from './court/court.module'
import { ObjectModule } from './object/object.module'
import { PeopleModule } from './people/people.module'
import { UnitModule } from './unit/unit.module'
import { HomeComponent } from './home/home.component'
import { AppModule } from './app.module'

const routes: Routes = [
  { 
    path: 'people', 
    loadChildren: () => PeopleModule
  },
  { 
    path: 'unit', 
    loadChildren: () => UnitModule
  },
  { 
    path: 'court', 
    loadChildren: () => CourtModule
  },
  { 
    path: 'object', 
    loadChildren: () => ObjectModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
