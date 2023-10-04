import { Component, ViewChild } from '@angular/core'

import { PoBreadcrumb, PoComboOption, PoDisclaimer, PoDynamicViewField, PoModalComponent, PoNotificationService, PoPageAction } from '@po-ui/ng-components'

import {
  PoPageDynamicTableCustomAction,
  PoPageDynamicTableCustomTableAction
} from '@po-ui/ng-templates'
import { PeopleService } from '../people.service'

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css'],
  providers: [PeopleService],
})
export class PeopleListComponent {
  @ViewChild('userDetailModal') userDetailModal!: PoModalComponent;
  @ViewChild('dependentsModal') dependentsModal!: PoModalComponent;

  public pessoas: any;
  filteredItems: Array<any> = [];
  filters: Array<PoDisclaimer> = [];
  nome: string = '';
  comboSports: string = '';

  public sports: PoComboOption[] = [
    { value: 'Beach Volley' },
    { value: 'Futevolei' },
    { value: 'Beach Tennis' },
    { value: 'Funcional' },
  ];

  detailedUser: any;
  dependents: any;

  isHideLoading = true;

  public readonly actions: Array<PoPageAction> = [
    { label: 'Novo', url: '/people/new', icon: 'po-icon-plus' }
  ];

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'People' }],
  };

  fields: Array<any> = [
    { property: '_id', key: true, visible: false, filter: true },
    { property: 'nome', label: 'Name', filter: true, gridColumns: 6 },
    { property: 'email', label: 'E-mail', filter: true, gridColumns: 6 },
    {
      property: 'genero',
      label: 'Genre',
      filter: true,
      gridColumns: 6,
      duplicate: true,
      sortable: false,
    },
    { property: 'search', filter: true, visible: false },
  ];

  readonly detailFields: Array<PoDynamicViewField> = [
    { property: '_id', key: true, visible: false },
    { property: 'nome', label: 'Name', divider: 'Pessoa', gridColumns: 6 },
    { property: 'genero', label: 'Genre', gridColumns: 6 },
    {
      property: 'dtNascimento',
      label: 'Birthdate',
      type: 'date',
      gridColumns: 6,
    },
    { property: 'cpf', divider: 'Documentos', label: 'CPF', gridColumns: 6 },
    { property: 'rg', label: 'RG', gridColumns: 6 },
  ];

  pageCustomActions: Array<PoPageDynamicTableCustomAction> = [
    {
      label: 'Print',
      action: this.printPage.bind(this),
      icon: 'po-icon-print',
    },
  ];

  tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [
    {
      label: 'Details',
      action: this.onClickUserDetail.bind(this),
      icon: 'po-icon-user',
    },
  ];

  constructor(
    private peopleService: PeopleService,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit() {
    this.isHideLoading = false;
    this.peopleService.getPeople().subscribe(
      (data: any) => (this.pessoas = data.items),
      () => {
        this.poNotification.error('Erro na busca de pessoas.');
        this.isHideLoading = true;
      },
      () => (this.isHideLoading = true)
    );
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

  addFilter(value: any, property: string) {
    let filter = <any>this.filters.find((item) => item.property === property);

    if (!filter) {
      filter = <any>{ property: property };
    } else {
      this.filters.splice(this.filters.indexOf(filter), 1);
      filter = Object.assign({}, filter);
    }

    filter.value = value;
    filter.label = `${
      property.charAt(0).toUpperCase() + property.slice(1)
    }: ${value}`;
    this.filters = [...this.filters, filter];
  }

  changeFilters(filters: Array<PoDisclaimer>) {
    filters.length ? this.filter(filters) : this.resetFilters();
    this.clearFieldsIfNoFilter('nome', 'sports');
  }

  private clearFieldsIfNoFilter(...fields: Array<string>) {
    const fieldHaveNoFilter = (field: any) =>
      !this.filters.some((filter) => filter.property === field);

    //    const fieldsWithoutFilter = fields.filter((field:any) => this[field] && fieldHaveNoFilter(field));

    //  fieldsWithoutFilter.forEach(field => (this[field] = undefined));
  }

  private filter(filters: Array<PoDisclaimer>) {
    const params = {}
    filters.forEach((filter:any) => Object.assign(params, { [filter.property]: filter.value }));

    this.isHideLoading = true;

    this.peopleService
      .getPeople(undefined,params)
      .subscribe((data: any) => (this.pessoas = data.items));
  }

  private resetFilters() {
    this.filteredItems = [...(this.pessoas || [])];
  }
}