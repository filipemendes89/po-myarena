import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CalendarModule } from './calendar/calendar.module'
import { ClassModule } from './class/class.module'
import { CourtModule } from './court/court.module'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login/login.component'
import { ObjectModule } from './object/object.module'
import { PeopleModule } from './people/people.module'
import { UnitModule } from './unit/unit.module'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'people',
        loadChildren: () => PeopleModule,
      },
      {
        path: 'unit',
        loadChildren: () => UnitModule,
      },
      {
        path: 'class',
        loadChildren: () => ClassModule,
      },
      {
        path: 'court',
        loadChildren: () => CourtModule,
      },
      {
        path: 'calendar',
        loadChildren: () => CalendarModule,
      },
      {
        path: 'object',
        loadChildren: () => ObjectModule,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
