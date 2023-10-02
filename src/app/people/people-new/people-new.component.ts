import { Component, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { PoBreadcrumb, PoDynamicFormField, PoNotificationService } from '@po-ui/ng-components'

import { Location } from '@angular/common'
import { PoPageDynamicEditActions, PoPageDynamicEditLiterals } from '@po-ui/ng-templates'
import { AppService } from 'src/app/app.service'
import { PeopleService } from '../people.service'


@Component({
  selector: 'app-people-new',
  templateUrl: './people-new.component.html',
  styleUrls: ['./people-new.component.css'],
  providers: [PeopleService]
})

export class PeopleNewComponent {
  @ViewChild('dynamicForm') dynamicForm: any

  public readonly serviceApi = 'https://myarenaapi.azurewebsites.net/api/people';
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
      { label: 'Pessoas', link: '/people' },
      { label: 'Novo' }
    ]
  };

  public pessoa:any = {}
  public id:any
  
  public readonly fields: Array<PoDynamicFormField> = [
    { property: 'tipo',divider: 'Tipo', options: ['Aluno', 'Professor'], gridColumns: 3, visible: this.appService.isAdmin() },
    { property: 'nome', divider: 'Dados Pessoais', required: true, label: "Nome" },
    { property: 'dtNascimento', label: 'Dt. Nascimento', type: 'date' },
    { property: 'genero', options: ['Feminino', 'Masculino'], gridColumns: 5, label: "Genero",  required: true  },
    { property: 'nacionalidade', options: ['Brasileiro', 'Estrangeiro'], gridColumns: 6, label: "Nacionalidade",  required: true   },
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
      required: true
    },
    { property: 'cpf',  required: true, mask: '999.999.999-99', label: "CPF", divider: 'Documentos' },
    { property: 'email', divider: 'Contatos', gridColumns: 4, icon: 'po-icon-mail', disabled: !this.appService.isAdmin(), gridSmColumns: 12 },
    { property: 'phone', mask: '(99) 99999-9999', gridColumns: 3, icon: 'po-icon-telephone', required: true, gridSmColumns: 12 },
    { property: 'instagram', gridColumns: 3, icon: 'po-icon-social-instagram', gridSmColumns: 12 },
  ];

  constructor(
    public poNotification: PoNotificationService, 
    public peopleService: PeopleService, 
    private activatedRoute: ActivatedRoute, 
    private _router: Router, 
    private appService: AppService,
    private location: Location
    ) {
  }

  private onActionComplete = () => { 
    this.isHideLoading = true
    this.poNotification.success(`Seu registro foi criado com sucesso!`) 
    this.dynamicForm.form.reset()
    this.location.back()
  }

  private onActionError = (error:any) => { 
    this.poNotification.error(error)
    this.isHideLoading = true
  }

  onClickSave() {
    this.isHideLoading = false
    
    if(this.id){
      this.peopleService.putPerson(`${this.serviceApi}/${this.id}`, this.pessoa).subscribe(
        {
          complete: this.onActionComplete,
          error: (error) => this.onActionError(error)
        }
      );
    }else{
      this.peopleService.postPerson(this.serviceApi, this.pessoa).subscribe(
        {
          complete: () => {
            
            if(!this.appService.isAdmin()){
              this.appService.setPessoa()
            }

            this.onActionComplete()
            
          },
          error: (error) => this.onActionError(error)
        }
      );
    }   
  }

  ngOnInit(){
    console.log(this.activatedRoute.snapshot?.params['id'])
    this.id = this.activatedRoute.snapshot?.params['id'];
    if(this.id){
      this.peopleService.getPeople(`${this.serviceApi}/${this.id}`).subscribe((data) => { this.pessoa = data })
    }

    if(history.state?.pessoa){
      this.pessoa = history.state?.pessoa
    }
  }
}