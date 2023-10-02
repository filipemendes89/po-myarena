import { Component, ViewChild } from '@angular/core'
import { PoBreadcrumb, PoListViewAction, PoListViewLiterals, PoNotificationService, PoPageAction, PoTableLiterals } from '@po-ui/ng-components'
import { AppService } from 'src/app/app.service'
import { ClassService } from '../class.service'

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css'],
})
export class ClassListComponent {
  @ViewChild('pageSlide') pageSlide: any;
  @ViewChild('pageSlideAluno') pageSlideAluno: any;

  public readonly actions: PoPageAction[] = [
    {
      icon: 'po-icon-plus',
      label: 'Novo',
      url: 'class/new',
      visible: this.appService.isAdmin()
    },
  ];

  private readonly isAdmin = this.appService.isAdmin()
  private readonly labelButtonAdd: string = this.isAdmin ? 'Alunos': 'Entrar'
  readonly actionsView: Array<PoListViewAction> = [
    {
      label: 'Excluir',
      action: (e: any) => this.deleteClass(e._id), //Excluir reserva no backend
      icon: 'po-icon-delete',
      type: 'danger',
      visible: this.appService.isAdmin()
    },
    {
      label: this.labelButtonAdd,
      action: (e: any) => {
        this.peopleList = e.peopleList.map((pessoa:any, index: number) => {
          pessoa.status = index + 1 <= e.people  ? 'available' : 'reserved'
          return pessoa
        });
        this.class = e;
        this.openPageSlide()
      },
      icon: 'po-icon-users',
    },
  ];

  public readonly literals: PoListViewLiterals = {
    showDetails: 'Lista de alunos',
    hideDetails: 'Fechar',
    noData: 'Sem aulas',
  };

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Class' }],
  };

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

  classApi = 'https://myarenaapi.azurewebsites.net/api/class';
  isHideLoading = true;
  peopleList: any;
  class: any;
  lookupDisabled: boolean = false;

  peopleColumns = [{ property: 'nome' }, { property: 'level', label: 'Nivel' }, {
    property: 'status',
    type: 'label',
    labels: [
      { value: 'available', color: 'color-11', label: 'Confirmado' },
      { value: 'reserved', color: 'color-08', label: 'Em espera' }
    ]
  }];

  constructor(
    private classService: ClassService,
    private poNotification: PoNotificationService,
    private appService: AppService
  ) {}
  classes: any;

  ngOnInit() {
    this.isHideLoading = false;
    this.classService.getClass(this.classApi).subscribe(
      (data: any) => {
        this.classes = data.items;
        this.isHideLoading = true;
      },
      (error) => {
        this.poNotification.error(error);
        this.isHideLoading = true;
      }
    );
  }

  showDetalhes(evento: any) {
    console.log(evento);
  }

  deleteClass(classId: string) {
    this.isHideLoading = false;
    this.classService.deleteClass(this.classApi, classId).subscribe({
      complete: () => {
        this.poNotification.success('Aula excluída com sucesso.');
        this.ngOnInit();
        this.isHideLoading = true;
      },
      error: (error) => {
        this.poNotification.error('Erro na exclusão da aula');
        this.poNotification.error(error);
        this.isHideLoading = true;
      },
    });
  }

  public onPessoaSelected(novaPessoa: any) {
    this.peopleList.find((pessoa: any) => pessoa._id === novaPessoa._id)
      ? null
      : this.peopleList.push(novaPessoa);
    this.class.peopleList = this.peopleList.map((people: any, index: number) => ({
      _id: people._id,
      nome: people.nome,
      level: people.level,
      status: index + 1 <= this.class.people ? 'available' : 'reserved'
    }));
  }

  public saveClass(event: any) {
    console.log(event);
    this.isHideLoading = false;
    this.classService.updateClass(this.classApi, this.class).subscribe({
      complete: () => {
        this.poNotification.success('Aula alterada com sucesso.');
        this.ngOnInit();
        this.isHideLoading = true;
        this.pageSlide.close();
      },
      error: (error) => {
        this.poNotification.error('Erro na alteração da aula');
        this.poNotification.error(error);
        this.isHideLoading = true;
      },
    });
  }

  public onPessoaDeleted(event: any) {
    this.class.peopleList = event.map((pessoa: any) => {
      pessoa.$selected = false;
      return pessoa;
    });
  }

  getClassByDate(date: string) {
    this.isHideLoading = false
    this.classService.getClassesByDate(this.classApi, date).subscribe({
      next: (data: any) => {
        this.classes = data.items;
        this.isHideLoading = true;
      },
      error: (error) => {
        this.poNotification.error(error);
        this.isHideLoading = true;
      },
    });
  }

  openPageSlide(){
    if(this.isAdmin)
      return this.pageSlide.open()
    
    this.onPessoaSelected(this.appService.getPessoa())
    return this.pageSlideAluno.open()
  }
}
