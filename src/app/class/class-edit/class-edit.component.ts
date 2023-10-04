import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { PoBreadcrumb, PoDynamicFormField, PoNotificationService, PoStepperOrientation } from '@po-ui/ng-components'
import { environment } from 'src/environments/environment'
import { ClassService } from '../class.service'

@Component({
  selector: 'app-class-edit',
  templateUrl: './class-edit.component.html',
  styleUrls: ['./class-edit.component.css']
})
export class ClassEditComponent {

  public readonly breadcrumb:PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Class', link: '/class' }, 
      { label: 'Edit' }
    ]
  }
  
  readonly detailFields: Array<PoDynamicFormField> = [
    { property: 'sport', label: 'Esporte', divider: 'Dados da Aula', gridColumns: 6, required: true },
    { property: 'date', label: 'Data', gridColumns: 6, required: true, readonly: true },
    { property: 'time', label: 'Horário', gridColumns: 2, required: true },
    { property: 'court', label: 'Quadra', gridColumns: 4, required: true, readonly: true },
    { property: 'teacherId', divider: 'Detalhes', label: 'Professor', gridColumns: 6, required: true, optionsService: `${environment.apiUrl}/people?tipo=Professor`, fieldLabel: 'nome', fieldValue: '_id'  },
    { property: 'people', label: 'Max. Alunos', gridSmColumns: 12, gridColumns: 2, required: true },
    { property: 'level', label: 'Nível', gridSmColumns: 12, required: true },
  ];

  isHideLoading = true
  
  public readonly orientation:PoStepperOrientation = PoStepperOrientation.Horizontal
  constructor(
    private classService: ClassService,
    private activatedRoute: ActivatedRoute,
    private poNotification: PoNotificationService,
    private _router: Router
  ){}

  class: any
  ngOnInit(){
    const id = this.activatedRoute.snapshot?.params['id'];
    this.classService.getClassById(id).subscribe({
      next: (data: any) => {
        this.class = data;
      },
      error: (error) => {
        this.poNotification.error('Erro na busca da aula')
        this.poNotification.error(error)
      } 
    })
  }

  onFinish = () => {
    this.isHideLoading = false

    this.classService.updateClass(this.class).subscribe(
      (data) => {
        this.poNotification.success('Aula alterada com sucesso.')
        this._router.navigateByUrl('/class')
        this.isHideLoading = true
      },
      (error) => {
        this.poNotification.error('Erro na alteração da aula')
        this.poNotification.error(error)
        this.isHideLoading = true
      })
  }
}
