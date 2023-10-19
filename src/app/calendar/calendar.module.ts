import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { PoButtonModule, PoDynamicModule, PoFieldModule, PoLoadingModule, PoPageModule, PoTableModule, PoWidgetModule } from '@po-ui/ng-components'
import { CalendarListComponent } from './calendar-list/calendar-list.component'
import { CalendarNewComponent } from './calendar-new/calendar-new.component'
import { CalendarRoutingModule } from './calendar-routing.module'


@NgModule({
  declarations: [
    CalendarNewComponent,
    CalendarListComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    PoPageModule,
    PoDynamicModule,
    PoButtonModule,
    PoFieldModule,
    PoTableModule,
    ReactiveFormsModule,
    PoWidgetModule,
    PoLoadingModule
  ]
  
})
export class CalendarModule { }
