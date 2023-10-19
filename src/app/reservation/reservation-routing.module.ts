import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MembersClassGuard } from '../class/members-class.guard'
import { ReservationCalendarComponent } from './reservation-calendar/reservation-calendar.component'
import { ReservationListComponent } from './reservation-list/reservation-list.component'
import { ReservationNewComponent } from './reservation-new/reservation-new.component'

const routes: Routes = [{
  path: 'calendar',
  component: ReservationListComponent,
  canActivate: [MembersClassGuard]
},
{
  path: 'new',
  component: ReservationNewComponent,
  canActivate: [MembersClassGuard]
},
{
  path: '',
  component: ReservationCalendarComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
