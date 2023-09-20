import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { PoContainerModule, PoDynamicModule, PoFieldModule, PoPageModule, PoStepperModule, PoWidgetModule } from '@po-ui/ng-components'
import { ClassNewComponent } from './class-new/class-new.component'
import { ClassRoutingModule } from './class-routing.module'


@NgModule({
  declarations: [
    ClassNewComponent
  ],
  imports: [
    CommonModule,
    ClassRoutingModule,
    PoPageModule,
    PoStepperModule,
    PoFieldModule,
    PoDynamicModule,
    PoContainerModule,
    PoWidgetModule
  ]
})
export class ClassModule { }
