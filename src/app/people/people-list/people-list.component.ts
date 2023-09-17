import { Component, ViewChild } from '@angular/core'

import { PoBreadcrumb, PoDynamicViewField, PoModalComponent } from '@po-ui/ng-components'

import {
  PoPageDynamicTableActions,
  PoPageDynamicTableCustomAction,
  PoPageDynamicTableCustomTableAction,
  PoPageDynamicTableOptions
} from '@po-ui/ng-templates'
import { PeopleService } from '../people.service'

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css'],
  providers: [PeopleService]
})

export class PeopleListComponent {
  @ViewChild('userDetailModal') userDetailModal!: PoModalComponent;
  @ViewChild('dependentsModal') dependentsModal!: PoModalComponent;

  readonly serviceApi = 'https://64f38ec0edfa0459f6c6aba4.mockapi.io/condomynium/api/v1/people';

  actionsRight = false;
  detailedUser: any;
  dependents: any;
  quickSearchWidth: number = 3;
  fixedFilter = false;

  readonly actions: PoPageDynamicTableActions = {
    new: 'people/new',
    edit: 'people/edit/:id',
    remove: true
  };

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'People' }]
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
    { property: 'nome', label: 'Name', filter: true, gridColumns: 6 },
    { property: 'email', label: 'E-mail', filter: true, gridColumns: 6 },
    { property: 'genero', label: 'Genre', filter: true, gridColumns: 6, duplicate: true, sortable: false },
    { property: 'search', filter: true, visible: false }
  ];

  readonly detailFields: Array<PoDynamicViewField> = [
    { property: 'id', key: true, visible: false },
    { property: 'nome', label: 'Name', divider: 'Pessoa', gridColumns: 6 },
    { property: 'genero', label: 'Genre', gridColumns: 6},
    {
      property: 'dtNascimento',
      label: 'Birthdate',
      type: 'date',
      gridColumns: 6
    },
    { property: 'cpf', divider: 'Documentos', label: 'CPF', gridColumns: 6},
    { property: 'rg', label: 'RG', gridColumns: 6}
  ];

  pageCustomActions: Array<PoPageDynamicTableCustomAction> = [
    { label: 'Print', action: this.printPage.bind(this), icon: 'po-icon-print' },
  ];

  tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [
    {
      label: 'Details',
      action: this.onClickUserDetail.bind(this),
      icon: 'po-icon-user'
    }
  ];

  constructor(private usersService: PeopleService) {}

  onLoad(): PoPageDynamicTableOptions {
    return {
      fields: [
        { property: 'id', key: true, visible: true, filter: true },
        { property: 'nome', label: 'Name', filter: true, gridColumns: 6 },
        { property: 'genero', label: 'Genre', filter: true, gridColumns: 6, duplicate: true },
        {
          property: 'dtNascimento',
          label: 'Birthdate',
          type: 'date',
          gridColumns: 6,
          visible: false,
          allowColumnsManager: true
        }
      ]
    };
  }

  isUserInactive(person: any) {
    return person.status === 'inactive';
  }

  hasDependents(person: any) {
    return person.dependents.length !== 0;
  }

  printPage() {
    window.print();
  }

  private onClickUserDetail(user: any) {
    this.detailedUser = user;

    this.userDetailModal.open();
  }
}