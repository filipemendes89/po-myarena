import { Component, ViewChild } from '@angular/core'
import { PoBreadcrumb, PoComboOption, PoDialogService, PoListViewAction, PoListViewLiterals, PoNotificationService, PoTableLiterals, PoTagType } from '@po-ui/ng-components'
import { AppService } from 'src/app/app.service'
import { ClassService } from '../class.service'

@Component({
  selector: 'app-members-class-new',
  templateUrl: './members-class-new.component.html',
  styleUrls: ['./members-class-new.component.css']
})
export class MembersClassNewComponent {
  @ViewChild('pageSlide') pageSlide: any;

  public sports: PoComboOption[] = [
    { value: 'Beach Volley' },
    { value: 'Futevolei' },
    { value: 'Beach Tennis' },
    { value: 'Funcional' },
  ];

  private readonly labelButtonAdd: string = 'Entrar'
  
  public readonly poLabelVagas = ' Vagas'
  public readonly poLabelCheia = ' pessoas na espera'
  public readonly poTagWarning:PoTagType= PoTagType.Warning
  public readonly poTagSuccess:PoTagType= PoTagType.Success

  readonly actionsView: Array<PoListViewAction> = [
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

  isHideLoading = true;
  peopleList: any;
  class: any;
  lookupDisabled: boolean = false;
  date: any
  sport: any

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
    private appService: AppService,
    private poDialogService: PoDialogService
  ) {}
  classes: any;

  ngOnInit() {
    this.isHideLoading = false;
    this.classService.getClass().subscribe(
      (data: any) => {
        this.classes = data.items.map(
          (classFound:any) => {
            const people = classFound.people - classFound.peopleList.length
            classFound.poType = classFound.isItFull ? this.poTagWarning : this.poTagSuccess
            classFound.poValue = classFound.isItFull ? `${Math.abs(people)}${this.poLabelCheia}` : `${people}${this.poLabelVagas}`
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
  public onPessoaSelected(novaPessoa: any) {
    this.peopleList.find((pessoa: any) => pessoa._id === novaPessoa._id)
      ? null
      : this.peopleList.push(novaPessoa);
    this.class.peopleList = this.peopleList = this.peopleList.map((people: any, index: number) => ({
      _id: people._id,
      nome: people.nome,
      level: people.level,
      status: index + 1 <= this.class.people ? 'available' : 'reserved'
    }));
  }

  public saveClass(event: any) {
    console.log(event);
    this.isHideLoading = false;
    this.classService.updateClass(this.class).subscribe({
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

  getClassByDate(value: string, filter:any) {
    this.isHideLoading = false
    
    let params: any = {}

    this.date = filter === 'date' ? value : this.date 
    this.date ? params.date = this.date : null
    this.sport = filter === 'sports' ? value : this.sport 
    this.sport ? params.sport = this.sport : null
    
    this.classService.getClass(params).subscribe({
      next: (data: any) => {
    
        this.classes = data.items.map(
          (classFound:any) => {
            const people = classFound.people - classFound.peopleList.length
            classFound.poType = classFound.isItFull ? this.poTagWarning : this.poTagSuccess
            classFound.poValue = classFound.isItFull ? `${Math.abs(people)}${this.poLabelCheia}` : `${people}${this.poLabelVagas}`
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

  openPageSlide(){
    this.onPessoaSelected(this.appService.getPessoa())
    return this.pageSlide.open()
  }

}
