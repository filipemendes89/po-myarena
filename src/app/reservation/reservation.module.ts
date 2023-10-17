import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { PoAvatarModule, PoButtonModule, PoDatepickerModule, PoDynamicModule, PoInfoModule, PoListViewModule, PoLoadingModule, PoPageModule, PoStepperModule, PoTabsModule, PoWidgetModule } from '@po-ui/ng-components'
import { ReservationListComponent } from './reservation-list/reservation-list.component'
import { ReservationNewComponent } from './reservation-new/reservation-new.component'
import { ReservationRoutingModule } from './reservation-routing.module'


@NgModule({
  declarations: [
    ReservationListComponent,
    ReservationNewComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    PoPageModule,
    PoWidgetModule,
    PoInfoModule,
    PoAvatarModule,
    PoDatepickerModule,
    PoListViewModule,
    PoLoadingModule,
    PoStepperModule,
    PoButtonModule,
    PoDynamicModule,
    PoTabsModule
  ]
})
export class ReservationModule { }
