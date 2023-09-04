import { Component, ViewChild } from '@angular/core'

import { PoBreadcrumb, PoDynamicViewField, PoModalComponent } from '@po-ui/ng-components'

import {
  PoPageDynamicTableActions,
  PoPageDynamicTableCustomAction,
  PoPageDynamicTableCustomTableAction,
  PoPageDynamicTableOptions
} from '@po-ui/ng-templates'

import { UnitService } from '../unit.service'

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent {
  @ViewChild('peopleModal') peopleModal!: PoModalComponent;

  readonly serviceApi = 'https://64f38ec0edfa0459f6c6aba4.mockapi.io/condomynium/api/v1/unit';

  detailedUser: any;
  people: any;
  quickSearchWidth: number = 3;
  fixedFilter = false;

  readonly actions: PoPageDynamicTableActions = {
    new: 'unit/new',
    edit: 'unit/edit/:id',
    remove: true
  };

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Unit' }]
  };

  readonly cityOptions: Array<object> = [
    { value: 'São Paulo', label: 'São Paulo' },
    { value: 'Joinville', label: 'Joinville' },
    { value: 'São Bento', label: 'São Bento' },
    { value: 'Araquari', label: 'Araquari' },
    { value: 'Campinas', label: 'Campinas' },
    { value: 'Osasco', label: 'Osasco' }
  ];

  fields: Array<any> = [
    { property: 'id', key: true, visible: false, filter: true },
    { property: 'grupo', filter: true, gridColumns: 6 },
    { property: 'torre', filter: true, gridColumns: 6, duplicate: true, sortable: false },
    { property: 'endereco', filter: true, visible: true },
    { property: 'numero', filter: true, visible: true }
  ];

  pageCustomActions: Array<PoPageDynamicTableCustomAction> = [
    {
      label: 'Fixed Filter',
      action: this.onClickFixedFilter.bind(this),
      visible: this.isVisibleFixedFilter.bind(this),
      icon: 'po-icon-lock'
    },
    {
      label: 'Not Fixed Filter',
      action: this.onClickFixedFilter.bind(this),
      visible: this.isVisibleNotFixedFilter.bind(this),
      icon: 'po-icon-lock-off'
    },
    { label: 'Print', action: this.printPage.bind(this), icon: 'po-icon-print' }
  ];

  tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [
    {
      label: 'Pessoas',
      action: this.onClickDependents.bind(this),
      visible: this.hasDependents.bind(this),
      icon: 'po-icon-user'
    }
  ];

  //constructor(private usersService: UnitService) {}

  onLoad(): PoPageDynamicTableOptions {
    return {
      fields: [
        { property: 'id', key: true, visible: false, filter: true },
        { property: 'grupo', filter: true, gridColumns: 6 },
        { property: 'torre', filter: true, gridColumns: 6, duplicate: true, sortable: false },
        { property: 'endereco', filter: true, visible: true },
        { property: 'numero', filter: true, visible: true }
      ]
    };
  }

  isUserInactive(person: any) {
    return person.status === 'inactive';
  }

  hasDependents(person: any) {
    return person.pessoas.length !== 0;
  }

  printPage() {
    window.print();
  }

  private onClickDependents(user: any) {
    this.people = user.pessoas;

    this.peopleModal.open();
  }

  private onClickFixedFilter() {
    this.fixedFilter = !this.fixedFilter;
    const fieldsDefault = [...this.fields];

    if (this.fixedFilter) {
      fieldsDefault
        .filter(field => field.property === 'search')
        .map(field => {
          field.initValue = 'Joinville';
          field.filter = true;
          field.fixed = true;
        });

      this.fields = fieldsDefault;
    } else {
      fieldsDefault
        .filter(field => field.property === 'search')
        .map(field => {
          field.initValue = 'São Paulo';
          field.fixed = false;
        });

      this.fields = fieldsDefault;
    }
  }

  private isVisibleFixedFilter() {
    return !this.fixedFilter;
  }

  private isVisibleNotFixedFilter() {
    return this.fixedFilter;
  }
}