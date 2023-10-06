import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '@auth0/auth0-angular'
import { CalendarModule } from './calendar/calendar.module'
import { ClassModule } from './class/class.module'
import { CourtModule } from './court/court.module'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login/login.component'
import { LogoutComponent } from './logout/logout/logout.component'
import { PeopleModule } from './people/people.module'
import { ReservationModule } from './reservation/reservation.module'
import { UnitModule } from './unit/unit.module'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'people',
        loadChildren: () => PeopleModule,
      },
      {
        path: 'sport',
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
        path: 'reservation',
        loadChildren: () => ReservationModule,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
