import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { PoAvatarModule, PoButtonModule, PoContainerModule, PoDatepickerModule, PoDynamicModule, PoInfoModule, PoListViewModule, PoLoadingModule, PoPageModule, PoStepperModule, PoTabsModule, PoWidgetModule } from '@po-ui/ng-components'
import { CalendarModule, DateAdapter } from 'angular-calendar'
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns'
import { ReservationCalendarComponent } from './reservation-calendar/reservation-calendar.component'
import { ReservationListComponent } from './reservation-list/reservation-list.component'
import { ReservationNewComponent } from './reservation-new/reservation-new.component'
import { ReservationRoutingModule } from './reservation-routing.module'


@NgModule({
  declarations: [
    ReservationListComponent,
    ReservationNewComponent,
    ReservationCalendarComponent
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
    PoTabsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    PoContainerModule
  ]
})
export class ReservationModule { }
