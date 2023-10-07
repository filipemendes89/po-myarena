import { Component, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { PoBreadcrumb, PoDialogService, PoListViewAction, PoListViewLiterals, PoLookupColumn, PoNotificationService, PoPageAction, PoTableColumn, PoTableLiterals, PoTagType } from '@po-ui/ng-components'
import { AppService } from 'src/app/app.service'
import { Level } from 'src/app/people/people-widget/people-widget.component'
import { IClass } from 'src/app/types/types'
import { environment } from 'src/environments/environment'
import { ClassService } from '../class.service'

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css'],
})
export class ClassListComponent {
  @ViewChild('pageSlide') pageSlide: any;

  public readonly actions: PoPageAction[] = [
    {
      icon: 'po-icon-plus',
      label: 'Novo',
      url: 'class/new',
      visible: this.appService.isAdmin()
    },
  ];

  private readonly labelButtonAdd: string = 'Alunos'
  
  public readonly filterService = `${environment.apiUrl}/people`
  
  public readonly poLabelVagas = ' Vagas'
  public readonly poLabelCheia = ' pessoas na espera'
  public readonly poTagWarning:PoTagType= PoTagType.Warning
  public readonly poTagSuccess:PoTagType= PoTagType.Success

  readonly actionsView: Array<PoListViewAction> = [
    {
      label: 'Excluir',
      action: (e: any) => this.poDialogService.alert({ title: 'Excluir', message: 'Tem certeza que deseja excluir a aula?', ok: () => this.deleteClass(e._id) }), 
      icon: 'po-icon-delete',
      type: 'danger',
      visible: this.appService.isAdmin()
    },
    {
      label: 'Editar',
      action: (e: any) => {
        this._router.navigateByUrl(`class/edit/${e._id}`)
      },
      icon: 'po-icon-edit',
    }
  ];

  public showDetail(){
    return true
  }
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

  isHideLoading = true;
  lookupDisabled: boolean = false;

  lookupColums: PoLookupColumn[] = [
    { property: 'nome' },
    { property: 'email' },
    { property: 'cpf' },
  ]

  peopleColumns: PoTableColumn[] = [{ property: 'nome' }, { property: 'level', label: 'Nivel' }, {
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
    private appService: AppService,
    private poDialogService: PoDialogService,
    private _router: Router
  ) {}
  classes: IClass[] = []

  ngOnInit() {
    this.isHideLoading = false;
    this.classService.getClass().subscribe(
      (data) => {
        this.classes = data.items.map(
          (classFound) => {
            const people = classFound.people - classFound.peopleList.length
            classFound.poType = classFound.isItFull ? this.poTagWarning : this.poTagSuccess
            classFound.poValue = classFound.isItFull ? `${Math.abs(people)}${this.poLabelCheia}` : `${people}${this.poLabelVagas}`
            classFound.peopleList =  classFound.peopleList.map((pessoa:any, index: number) => {
              pessoa.status = index + 1 <= classFound.people  ? 'available' : 'reserved'
              pessoa.level = Level[pessoa.levels?.find((sport:any) => sport.sport === classFound.sport)?.levelNumber]
              return pessoa
            });
            return classFound
          }
        );
        this.isHideLoading = true;
      },
      (error) => {
        this.poNotification.error(error);
        this.isHideLoading = true;
      }
    );
  }

  showDetalhes(evento: any) {
    
  }

  deleteClass(classId: string) {
    this.isHideLoading = false;
    this.classService.deleteClass(classId).subscribe({
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

  public onPessoaSelected(classS: any, novaPessoa: any) {
    
    classS.peopleList.find((pessoa: any) => pessoa._id === novaPessoa._id)
      ? null
      : classS.peopleList.push(novaPessoa);
    classS.peopleList = classS.peopleList.map((people: any, index: number) => ({
      _id: people._id,
      nome: people.nome,
      level: people.level,
      status: index + 1 <= classS.people ? 'available' : 'reserved'
    }));
  }

  public saveClass(classS: any) {
    
    this.isHideLoading = false;
    this.classService.updateClass(classS).subscribe({
      complete: () => {
        this.poNotification.success('Aula alterada com sucesso.');
        this.ngOnInit();
        this.isHideLoading = true;
      },
      error: (error) => {
        this.poNotification.error('Erro na alteração da aula');
        this.poNotification.error(error);
        this.isHideLoading = true;
      },
    });
  }

  public onPessoaDeleted(classS: any, event: any) {
    classS.peopleList = event.map((pessoa: any) => {
      pessoa.$selected = false;
      return pessoa;
    });
  }

  getClassByDate(date: string) {
    this.isHideLoading = false
    const params = date ? { date } : {}
    
    this.classService.getClass(params).subscribe({
      next: (data) => {
        this.classes = data.items.map(
          (classFound) => {
            const people = classFound.people - classFound.peopleList.length
            classFound.poType = classFound.isItFull ? this.poTagWarning : this.poTagSuccess
            classFound.poValue = classFound.isItFull ? `${Math.abs(people)}${this.poLabelCheia}` : `${people}${this.poLabelVagas}`
            classFound.peopleList =  classFound.peopleList.map((pessoa:any, index: number) => {
              pessoa.status = index + 1 <= classFound.people  ? 'available' : 'reserved'
              return pessoa
            });
            return classFound
          }
        );
        this.isHideLoading = true;
      },
      error: (error) => {
        this.poNotification.error(error);
        this.isHideLoading = true;
      },
    });
  }

  getNivel(item: any) {

  }
}
