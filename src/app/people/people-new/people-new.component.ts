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
    { property: 'nome', divider: 'Dados Pessoais', required: true, label: "Nome" },
    { property: 'dtNascimento', label: 'Dt. Nascimento', type: 'date' },
    { property: 'genero', options: ['Feminino', 'Masculino'], gridColumns: 4, label: "Genero"  },
    { property: 'nacionalidade', options: ['Brasileiro', 'Estrangeiro'], gridColumns: 4, label: "Nacionalidade"   },
    { property: 'rg', divider: 'Documentos', required: true, label: "RG" },
    { property: 'cpf',  required: true, label: "CPF" },
    { property: 'email', divider: 'Contatos', gridColumns: 6, icon: 'po-icon-mail' },
    { property: 'phone', mask: '(99) 99999-9999', gridColumns: 6 },
  ];
}