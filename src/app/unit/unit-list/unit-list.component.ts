import { Component, ViewChild } from '@angular/core'

import { PoBreadcrumb, PoModalAction, PoModalComponent, PoNotificationService } from '@po-ui/ng-components'

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
  styleUrls: ['./unit-list.component.css'],
  providers: [UnitService]
})
export class UnitListComponent {
  @ViewChild('peopleModal') peopleModal!: PoModalComponent;
 
  readonly serviceApi = 'https://64f38ec0edfa0459f6c6aba4.mockapi.io/condomynium/api/v1/unit';
  
  isHideLoading = true;
  
  detailedUser: any;
  people: any;
  unit: any;
  quickSearchWidth: number = 3;

  readonly actions: PoPageDynamicTableActions = {
    new: 'unit/new',
    edit: 'unit/edit/:id',
    remove: true
  };

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Unit' }]
  };

  fields: Array<any> = [
    { property: 'id', key: true, visible: false, filter: true },
    { property: 'grupo', filter: true, gridColumns: 6 },
    { property: 'torre', filter: true, gridColumns: 6, duplicate: true, sortable: false },
    { property: 'endereco', filter: true, visible: true },
    { property: 'numero', filter: true, visible: true }
  ];

  pageCustomActions: Array<PoPageDynamicTableCustomAction> = [
    { label: 'Print', action: this.printPage.bind(this), icon: 'po-icon-print' }
  ];

  tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [
    {
      label: 'Pessoas',
      action: this.onClickDependents.bind(this),
      icon: 'po-icon-user'
    }
  ];

  constructor(public poNotification: PoNotificationService,public unitService: UnitService) {}
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

  printPage() {
    window.print();
  }

  private onClickDependents(user: any) {
    this.people = user.pessoas;
    this.unit = user
    this.peopleModal.open();
  }

  public onPessoaSelected(novaPessoa: any) {
    this.people.find((pessoa:any) => pessoa.id === novaPessoa.id) ? null : this.people.push(novaPessoa)
    this.unit.pessoas = this.people
    //this.unitService.putUnit(novaPessoa.get('novaPessoa'))
  }
  
  confirm: PoModalAction = {
    action: () => {
      this.isHideLoading = false
      this.unitService.putUnit(this.unit).subscribe(
        {
          complete: () => { 
            this.isHideLoading = true
            this.poNotification.success(`Seu registro foi alterado com sucesso!`) 
            this.peopleModal.close()
          },
          error: (error) => { 
            this.poNotification.error(error)
            this.isHideLoading = true
          }
        }
      );
    },
    label: 'Confirmar'
  };

  cancel: PoModalAction = {
    action: () => {
      this.peopleModal.close()
    },
    label: 'Cancelar'
  };
}
