import { Component, ViewChild } from '@angular/core'
import { PoBreadcrumb, PoDialogService, PoListViewAction, PoListViewLiterals, PoNotificationService, PoPageAction, PoTagType } from '@po-ui/ng-components'
import { AppService } from 'src/app/app.service'
import { ClassService } from '../class.service'

@Component({
  selector: 'app-members-class-list',
  templateUrl: './members-class-list.component.html',
  styleUrls: ['./members-class-list.component.css']
})
export class MembersClassListComponent {
  @ViewChild('pageSlideAluno') pageSlideAluno: any;

  public readonly actions: PoPageAction[] = [
    {
      icon: 'po-icon-plus',
      label: 'Marcar aula',
      url: 'class/members/new'
    },
  ];
  
  public readonly poLabelVagas = ' Vagas'
  public readonly poLabelCheia = ' pessoas na espera'
  public readonly poTagWarning:PoTagType= PoTagType.Warning
  public readonly poTagSuccess:PoTagType= PoTagType.Success

  readonly actionsView: Array<PoListViewAction> = [
    {
      label: 'Sair',
      action: (e: any) => {
        this.poDialogService.alert({ title: 'Sair', message: 'Tem certeza que deseja sair da aula?', ok: () => this.leaveCLass(e) })
        return 
      },
      icon: 'po-icon-exit',
      type: 'danger'
    },
    {
      label: 'Lista',
      action: (e: any) => {
        this.peopleList = e.peopleList.map((pessoa:any, index: number) => {
          pessoa.status = index + 1 <= e.people  ? 'available' : 'reserved'
          return pessoa
        });
        this.class = e;
        this.openPageSlide()
      },
      icon: 'po-icon-users',
    }
  ];

  public readonly literals: PoListViewLiterals = {
    showDetails: 'Lista de alunos',
    hideDetails: 'Fechar',
    noData: 'Sem aulas',
  };

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Members', link: 'class/members' }],
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
    private appService: AppService,
    private poDialogService: PoDialogService
  ) {}
  classes: any;

  ngOnInit() {
    this.isHideLoading = false;
    this.classService.getClass(this.classApi).subscribe(
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
    return this.pageSlideAluno.open()
  }

  leaveCLass(selectedClass: any) {
    selectedClass.peopleList = selectedClass.peopleList.filter((pessoa:any) => pessoa._id !== this.appService.getPessoa()._id)
    this.classService.updateClass(this.classApi, selectedClass).subscribe({
      complete: () => {
        this.poNotification.success('Aula cancelada com sucesso.');
        this.ngOnInit();
      },
      error: (error) => {
        this.poNotification.error('Erro na cancelamento da aula');
        this.poNotification.error(error);
      },
    })
  }
}
