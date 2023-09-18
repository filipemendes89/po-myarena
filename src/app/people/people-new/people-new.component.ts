import { Component } from '@angular/core'

import { PoBreadcrumb, PoDynamicFormField, PoNotificationService } from '@po-ui/ng-components'

import { PoPageDynamicEditActions, PoPageDynamicEditLiterals } from '@po-ui/ng-templates'
import { PeopleService } from '../people.service'


@Component({
  selector: 'app-people-new',
  templateUrl: './people-new.component.html',
  styleUrls: ['./people-new.component.css'],
  providers: [PeopleService]
})

export class PeopleNewComponent {
  public readonly serviceApi = 'https://64f38ec0edfa0459f6c6aba4.mockapi.io/condomynium/api/v1/people';
  public isHideLoading = true
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
      { label: 'Alunos', link: '/people' },
      { label: 'Novo' }
    ]
  };

  public pessoa:any = {}

  public readonly fields: Array<PoDynamicFormField> = [
    { property: 'nome', divider: 'Dados Pessoais', required: true, label: "Nome" },
    { property: 'dtNascimento', label: 'Dt. Nascimento', type: 'date' },
    { property: 'genero', options: ['Feminino', 'Masculino'], gridColumns: 3, label: "Genero"  },
    { property: 'nacionalidade', options: ['Brasileiro', 'Estrangeiro'], gridColumns: 3, label: "Nacionalidade"   },
    {
      property: 'avatar',
      type: 'upload',
      gridColumns: 12,
      gridSmColumns: 12,
      label: 'Avatar',
      optional: true,
      url: 'https://po-sample-api.fly.dev/v1/uploads/addFile',
      hideSendButton: true
    },
    {
      property: 'sports',
      divider: 'Esportes',
      label: 'Esportes',
      gridColumns: 6,
      gridSmColumns: 12,
      optional: false,
      options: ['Beach Volley', 'Futevolei', 'Beach Tennis', 'Funcional'],
      optionsMulti: true,
    },
    { property: 'cpf',  required: true, mask: '999.999.999-99', label: "CPF", divider: 'Documentos' },
    { property: 'email', divider: 'Contatos', gridColumns: 6, icon: 'po-icon-mail' },
    { property: 'phone', mask: '(99) 99999-9999', gridColumns: 6, icon: 'po-icon-telephone' },
  ];

  constructor(public poNotification: PoNotificationService, public peopleService: PeopleService) {
  }

  private onActionComplete = () => { 
    this.isHideLoading = true
    this.poNotification.success(`Seu registro foi criado com sucesso!`) 
  }

  private onActionError = (error:any) => { 
    this.poNotification.error(error)
    this.isHideLoading = true
  }

  onClickSave() {
    this.isHideLoading = false
    this.peopleService.postPerson(this.serviceApi, this.pessoa).subscribe(
      {
        complete: this.onActionComplete,
        error: (error) => this.onActionError(error)
      }
    );
  }
}