import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { PoButtonModule, PoDynamicModule, PoFieldModule, PoPageModule, PoTableModule } from '@po-ui/ng-components'
import { CalendarNewComponent } from './calendar-new/calendar-new.component'
import { CalendarRoutingModule } from './calendar-routing.module'


@NgModule({
  declarations: [
    CalendarNewComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    PoPageModule,
    PoDynamicModule,
    PoButtonModule,
    PoFieldModule,
    PoTableModule,
    ReactiveFormsModule
  ]
})
export class CalendarModule { }
