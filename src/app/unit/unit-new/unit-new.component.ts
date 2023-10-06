import { Component } from '@angular/core'

import { PoBreadcrumb, PoDynamicFormField } from '@po-ui/ng-components'
import { PoPageDynamicEditActions, PoPageDynamicEditLiterals } from '@po-ui/ng-templates'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-unit-new',
  templateUrl: './unit-new.component.html',
  styleUrls: ['./unit-new.component.css']
})
export class UnitNewComponent {

  public readonly fieldsPessoas: Array<any> = [
    { property: '_id', key: true, visible: false, filter: true },
    { property: 'name', label: 'Nome', filter: true, gridColumns: 6 },
    { property: 'hasClass', label: 'Aulas?', filter: true, gridColumns: 6, duplicate: true, sortable: false }
  ];

  public readonly serviceApi = `${environment.apiUrl}/sport`

  public readonly actions: PoPageDynamicEditActions = {
    saveNew: '/sport/new',
    save: '/sport',
    cancel: '/sport'
  };

  public readonly literals: PoPageDynamicEditLiterals = {
    pageActionCancel: 'Descartar',
    pageActionSave: 'Gravar',
    pageActionSaveNew: 'Salvar e Novo'
  };

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Sports', link: '/sport' },
      { label: 'New' }
    ]
  };

  public readonly fields: Array<PoDynamicFormField> = [
    { property: '_id', key: true, visible: false },
    { property: 'name', label: 'Nome do Esporte', divider: 'Dados'},
    { property: 'hasClass', label: 'Tem aulas?', type: 'boolean' }
  ];
}
