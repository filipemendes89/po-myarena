import { Component } from '@angular/core'

import { PoBreadcrumb, PoDynamicFormField } from '@po-ui/ng-components'
import { PoPageDynamicEditActions, PoPageDynamicEditLiterals } from '@po-ui/ng-templates'

@Component({
  selector: 'app-unit-new',
  templateUrl: './unit-new.component.html',
  styleUrls: ['./unit-new.component.css']
})
export class UnitNewComponent {

  public readonly fieldsPessoas: Array<any> = [
    { property: 'id', key: true, visible: false, filter: true },
    { property: 'nome', label: 'Name', filter: true, gridColumns: 6 },
    { property: 'genero', label: 'Genre', filter: true, gridColumns: 6, duplicate: true, sortable: false },
    { property: 'search', filter: true, visible: false },
    { property: 'cidade', label: 'City', filter: true, duplicate: true, gridColumns: 12 }
  ];

  public readonly serviceApi = 'https://64f38ec0edfa0459f6c6aba4.mockapi.io/condomynium/api/v1/unit';

  public readonly actions: PoPageDynamicEditActions = {
    saveNew: '/unit/new',
    save: '/unit',
    cancel: '/unit'
  };

  public readonly literals: PoPageDynamicEditLiterals = {
    pageActionCancel: 'Descartar',
    pageActionSave: 'Gravar',
    pageActionSaveNew: 'Salvar e Novo'
  };

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Unit', link: '/unit' },
      { label: 'New' }
    ]
  };

  public readonly fields: Array<PoDynamicFormField> = [
    { property: 'id', key: true, visible: false },
    { property: 'grupo', divider: 'Unidade', gridColumns: 2 },
    { property: 'torre', divider: 'Apartamentos', gridColumns: 2 },
    { property: 'endereco', visible: true, divider: 'Casas', gridColumns: 6 },
    { property: 'numero', visible: true, gridColumns: 2 }
  ];
}
