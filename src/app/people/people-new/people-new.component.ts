import { Component } from '@angular/core'

import { PoBreadcrumb, PoDynamicFormField } from '@po-ui/ng-components'

import { PoPageDynamicEditActions, PoPageDynamicEditLiterals } from '@po-ui/ng-templates'


@Component({
  selector: 'app-people-new',
  templateUrl: './people-new.component.html',
  styleUrls: ['./people-new.component.css']
})

export class PeopleNewComponent {
  public readonly serviceApi = 'https://64f38ec0edfa0459f6c6aba4.mockapi.io/condomynium/api/v1/people';

  public readonly actions: PoPageDynamicEditActions = {
    saveNew: '/people/new',
    save: '/people',
    cancel: '/people'
  };

  public readonly literals: PoPageDynamicEditLiterals = {
    pageActionCancel: 'Descartar',
    pageActionSave: 'Gravar',
    pageActionSaveNew: 'Salvar e Novo'
  };

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'People', link: '/people' },
      { label: 'New' }
    ]
  };

  public readonly fields: Array<PoDynamicFormField> = [
    { property: 'bloco', divider: 'Unidade', required: true, label: "Bloco", gridColumns: 1, optionsService: 'https://condomynium.free.beeceptor.com/torres' },
    { property: 'numero', required: true, label: "Unidade", gridColumns: 1 },
    { property: 'nome', divider: 'Dados Pessoais', required: true, label: "Nome" },
    { property: 'email', label: 'E-mail' },
    { property: 'dtNascimento', label: 'Dt. Nascimento', type: 'date' },
    { property: 'genero', options: ['Feminino', 'Masculino'], gridColumns: 4, label: "Genero"  },
    { property: 'nacionalidade', options: ['Brasileiro', 'Estrangeiro'], gridColumns: 4, label: "Nacionalidade"   },
    {
      property: 'cep',
      divider: 'Endereço',
      gridColumns: 1,
      label: "CEP"
    },
    {
      property: 'endereco',
      gridColumns: 6,
      label: "Endereço"
    },
    {
      property: 'cidade',
      gridColumns: 3,
      label: "Cidade"
    },
    {
      property: 'estado',
      label: "Estado",
      gridColumns: 1
    }
  ];
}