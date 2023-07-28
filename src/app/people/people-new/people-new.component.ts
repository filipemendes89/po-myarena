import { Component } from '@angular/core'

import { PoBreadcrumb, PoDynamicFormField } from '@po-ui/ng-components'

import { PoPageDynamicEditActions, PoPageDynamicEditLiterals } from '@po-ui/ng-templates'


@Component({
  selector: 'app-people-new',
  templateUrl: './people-new.component.html',
  styleUrls: ['./people-new.component.css']
})

export class PeopleNewComponent {
  public readonly serviceApi = 'https://po-sample-api.fly.dev/v1/people';

  public readonly actions: PoPageDynamicEditActions = {
    saveNew: '/documentation/po-page-dynamic-edit'
  };

  public readonly literals: PoPageDynamicEditLiterals = {
    pageActionCancel: 'Descartar',
    pageActionSave: 'Gravar'
  };

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'People', link: '/documentation/po-page-dynamic-table' },
      { label: 'New' }
    ]
  };

  public readonly fields: Array<PoDynamicFormField> = [
    { property: 'code', divider: 'Unidade', required: true, label: "Bloco", gridColumns: 1, optionsService: 'https://condomynium.free.beeceptor.com/torres' },
    { property: 'unit', required: true, label: "Unidade", gridColumns: 1 },
    { property: 'name', divider: 'Dados Pessoais', required: true, label: "Nome" },
    { property: 'email', label: 'E-mail' },
    { property: 'birthdate', label: 'Nascimento', type: 'date' },
    { property: 'genre', options: ['Feminino', 'Masculino', 'others'], gridLgColumns: 6, label: "Genero"  },
    { property: 'nationality', options: ['Brasileiro', 'Estrangeiro'], label: "Nacionalidade"   },
    { property: 'birthPlace', label: 'Local de Nascimento' },
    {
      property: 'cep',
      divider: 'Endereço',
      gridColumns: 1,
      label: "CEP"
    },
    {
      property: 'street',
      gridColumns: 6,
      label: "Endereço"
    },
    {
      property: 'city',
      gridColumns: 3,
      label: "Cidade"
    },
    {
      property: 'state',
      label: "Estado",
      gridColumns: 1
    }
  ];
}