import { Component, ViewChild } from '@angular/core'

import { PoBreadcrumb, PoModalComponent, PoNotificationService } from '@po-ui/ng-components'

import {
  PoPageDynamicTableActions,
  PoPageDynamicTableCustomAction, PoPageDynamicTableOptions
} from '@po-ui/ng-templates'
import { environment } from 'src/environments/environment'
import { UnitService } from '../unit.service'


@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css'],
  providers: [UnitService]
})
export class UnitListComponent {
  @ViewChild('peopleModal') peopleModal!: PoModalComponent;
 
  readonly serviceApi = `${environment.apiUrl}/sport`;
  
  isHideLoading = true;
  
  detailedUser: any;
  people: any;
  unit: any;
  quickSearchWidth: number = 3;
  columns: Array<any> = [
    { property: 'nome' },
    { property: 'hasClass'}
  ]

  readonly actions: PoPageDynamicTableActions = {
    new: 'unit/new',
    edit: 'unit/edit/:id',
    remove: true
  };

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Unit' }]
  };

  fields: Array<any> = [
    { property: '_id', key: true, visible: false, filter: true },
    { property: 'name', filter: true, gridColumns: 6 },
    { property: 'hasClass', filter: true, gridColumns: 6, duplicate: true, sortable: false }
  ];

  pageCustomActions: Array<PoPageDynamicTableCustomAction> = [
    { label: 'Print', action: this.printPage.bind(this), icon: 'po-icon-print' }
  ];


  constructor(public poNotification: PoNotificationService,public unitService: UnitService) {}
  onLoad(): PoPageDynamicTableOptions {
    return {
      fields: [
        { property: '_id', key: true, visible: false, filter: true },
        { property: 'name', filter: true, gridColumns: 6 },
        { property: 'hasClass', label: 'Aulas?', format: 'boolean', filter: true, gridColumns: 6, duplicate: true, sortable: false }
      ]
    };
  }

  printPage() {
    window.print();
  }
}
