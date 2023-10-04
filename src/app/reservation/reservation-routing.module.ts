import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MembersClassGuard } from '../class/members-class.guard'
import { ReservationListComponent } from './reservation-list/reservation-list.component'
import { ReservationNewComponent } from './reservation-new/reservation-new.component'

const routes: Routes = [{
  path: '',
  component: ReservationListComponent,
  canActivate: [MembersClassGuard]
},
{
  path: 'new',
  component: ReservationNewComponent,
  canActivate: [MembersClassGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
