import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjectRoutingModule } from './object-routing.module';
import { ObjectListComponent } from './object-list/object-list.component';
import { PoPageModule, PoWidgetModule } from '@po-ui/ng-components';


@NgModule({
  declarations: [ObjectListComponent],
  imports: [
    CommonModule,
    ObjectRoutingModule,
    PoPageModule,
    PoWidgetModule
  ]
})
export class ObjectModule { }
