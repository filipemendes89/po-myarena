import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PoAvatarModule, PoButtonModule, PoCalendarModule, PoContainerModule, PoDynamicModule, PoImageModule, PoInfoModule, PoListViewModule, PoLoadingModule, PoPageModule, PoSwitchModule } from '@po-ui/ng-components'
import { CalendarModule, DateAdapter } from 'angular-calendar'
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns'
import { CourtListComponent } from './court-list/court-list.component'
import { CourtNewComponent } from './court-new/court-new.component'
import { CourtRoutingModule } from './court-routing.module'



@NgModule({
  declarations: [
    CourtListComponent,
    CourtNewComponent
  ],
  imports: [
    CommonModule,
    CourtRoutingModule,
    PoPageModule,
    PoListViewModule,
    PoInfoModule,
    PoAvatarModule,
    PoImageModule,
    PoContainerModule,
    PoSwitchModule,
    PoCalendarModule,
    PoDynamicModule,
    PoButtonModule,
    PoLoadingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ]
})
export class CourtModule { }
