import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { PoButtonModule, PoContainerModule, PoDynamicModule, PoFieldModule, PoLoadingModule, PoPageModule, PoStepperModule, PoWidgetModule } from '@po-ui/ng-components'
import { ClassNewComponent } from './class-new/class-new.component'
import { ClassRoutingModule } from './class-routing.module'
import { PoPageDynamicEditModule } from '@po-ui/ng-templates';
import { ClassListComponent } from './class-list/class-list.component'


@NgModule({
  declarations: [
    ClassNewComponent,
    ClassListComponent
  ],
  imports: [
    CommonModule,
    ClassRoutingModule,
    PoPageModule,
    PoStepperModule,
    PoFieldModule,
    PoDynamicModule,
    PoContainerModule,
    PoWidgetModule,
    PoButtonModule,
    PoLoadingModule,
    PoPageDynamicEditModule,
    PoDynamicModule
  ]
})
export class ClassModule { }
