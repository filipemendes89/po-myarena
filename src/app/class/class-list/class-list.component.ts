import { Component, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { PoBreadcrumb, PoListViewAction, PoListViewLiterals, PoNotificationService, PoPageAction, PoTableLiterals } from '@po-ui/ng-components'
import { ClassService } from '../class.service'

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent {
  @ViewChild('pageSlide') pageSlide:any

  public readonly actions: PoPageAction[] = [{
    icon: 'po-icon-plus',
    label: 'Novo',
    url: 'class/new'
  }]

  readonly actionsView: Array<PoListViewAction> = [
    {
      label: 'Excluir',
      action: (e:any) => this.deleteClass(e.id), //Excluir reserva no backend
      icon: 'po-icon-delete',
      type: 'danger'
    },
    {
      label: 'Alunos',
      action: (e:any) => {
        this.peopleList = e.peopleList
        this.class = e
        this.pageSlide.open()
      },
      icon: 'po-icon-users'
    },   
  ];

  public readonly literals:PoListViewLiterals = {
    showDetails: 'Lista de alunos',
    hideDetails: 'Fechar',
    noData: 'Sem aulas'
  }

  public readonly breadcrumb:PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Class' }]
  }

  public readonly literalsTable: PoTableLiterals = {
    noColumns: 'Nenhuma definição de colunas',
    noData: 'Nenhum dado encontrado',
    noVisibleColumn: 'Nenhuma coluna visível',
    noItem: 'Nenhum aluno selecionado',
    loadingData: 'Carregando',
    loadMoreData: 'Carregar mais resultados',
    seeCompleteSubtitle: 'Ver legenda completa',
    completeSubtitle: 'Legenda completa',
    columnsManager: 'Gerenciador de colunas',
    bodyDelete: 'Deseja realmente excluir esse aluno?',
    cancel: 'Cancelar',
    delete: 'Excluir',
    deleteSuccessful: 'Alunos removidos com sucesso',
    deleteApiError: 'Ocorreu um erro inesperado, tente novamente mais tarde!',
  };

  classApi = 'https://64f38ec0edfa0459f6c6aba4.mockapi.io/condomynium/api/v1/class'
  isHideLoading = true
  peopleList:any
  class:any
  lookupDisabled:boolean = false
  
  peopleColumns = [
    { property: 'nome'},
    { property: 'level', label: 'Nivel'}
  ];

  constructor(private classService: ClassService, private poNotification: PoNotificationService, private _router: Router) {}
  classes:any

  ngOnInit() {
    this.isHideLoading = false
    this.classService.getClass(this.classApi).subscribe(
    (data: any) => { 
      this.classes = data.items 
      this.isHideLoading = true
    }, 
    (error) => {
      this.poNotification.error(error)
      this.isHideLoading = true
    })
  }

  showDetalhes(evento:any){
    console.log(evento)
  }

  deleteClass(classId: string) {
    this.isHideLoading = false
    this.classService.deleteClass(this.classApi,classId).subscribe({
      complete: () => {
        this.poNotification.success('Aula excluída com sucesso.')
        this.ngOnInit()
        this.isHideLoading = true
      },
      error: (error) => {
        this.poNotification.error('Erro na exclusão da aula')
        this.poNotification.error(error)
        this.isHideLoading = true
      }
    })
  }

  public onPessoaSelected(novaPessoa: any) {
    this.peopleList.find((pessoa:any) => pessoa.id === novaPessoa.id) ? null : this.peopleList.push(novaPessoa)
    this.class.peopleList = this.peopleList.map((people: any) => ({ id: people.id, nome: people.nome, level: people.level }))
  }

  public saveClass(event:any) {
    console.log(event)
    this.isHideLoading = false
    this.classService.updateClass(this.classApi, this.class).subscribe({
      complete: () => {
        this.poNotification.success('Aula alterada com sucesso.')
        this.ngOnInit()
        this.isHideLoading = true
        this.pageSlide.close()
      },
      error: (error) => {
        this.poNotification.error('Erro na alteração da aula')
        this.poNotification.error(error)
        this.isHideLoading = true
      }
    })
  }

  public onPessoaDeleted(event:any) {
    this.class.peopleList = event.map((pessoa:any) => { pessoa.$selected = false; return pessoa })
  }
}
