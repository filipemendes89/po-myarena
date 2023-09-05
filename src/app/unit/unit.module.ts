import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PoContainerModule, PoDynamicModule, PoFieldModule, PoInfoModule, PoLoadingModule, PoModalModule, PoStepperModule, PoTableModule, PoWidgetModule } from '@po-ui/ng-components'
import { PoPageDynamicEditModule, PoPageDynamicTableModule } from '@po-ui/ng-templates'
import { UnitListComponent } from './unit-list/unit-list.component'
import { UnitNewComponent } from './unit-new/unit-new.component'
import { UnitRoutingModule } from './unit-routing.module'
@NgModule({
  declarations: [
    UnitListComponent,
    UnitNewComponent
  ],
  imports: [
    CommonModule,
    PoPageDynamicTableModule,
    PoModalModule,
    PoDynamicModule,
    PoTableModule,
    UnitRoutingModule,
    PoFieldModule,
    PoWidgetModule,
    PoInfoModule,
    PoStepperModule,
    PoLoadingModule,
    PoPageDynamicEditModule,
    PoContainerModule
  ]
})
export class UnitModule { }
