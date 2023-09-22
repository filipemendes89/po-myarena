import { Component } from '@angular/core'
import { PoDynamicFormField, PoDynamicViewField, PoStepperOrientation } from '@po-ui/ng-components'
import { ClassService } from '../class.service'

@Component({
  selector: 'app-class-new',
  templateUrl: './class-new.component.html',
  styleUrls: ['./class-new.component.css'],
  providers: [ClassService]
})
export class ClassNewComponent {
  public readonly orientation:PoStepperOrientation = PoStepperOrientation.Horizontal

  public readonly fieldsSecondStep: Array<PoDynamicFormField> = [
    {
      property: 'teacher',
      label: 'Professor',
      gridColumns: 8,
      gridSmColumns: 12,
      optionsService: 'https://64f38ec0edfa0459f6c6aba4.mockapi.io/condomynium/api/v1/people?tipo=Professor',
      fieldLabel: 'nome',
      fieldValue: 'id',
    },
    {
      property: 'sport',
      divider: 'Esporte',
      label: 'Esporte',
      gridColumns: 8,
      gridSmColumns: 12,
      optional: false,
      options: ['Beach Volley', 'Futevolei', 'Beach Tennis', 'Funcional'],
      optionsMulti: false,
    },
    {
      property: 'classSize',
      label: 'Max. Alunos',
      type: 'number',
      gridColumns: 2,
      maxValue: 10000,
      errorMessage: 'Invalid number.'
    },
  ]

  readonly detailFields: Array<PoDynamicViewField> = [
    { property: 'sport', label: 'Esporte', divider: 'Dados da Aula', gridColumns: 6 },
    { property: 'date', label: 'Data', type: 'date', gridColumns: 6 },
    { property: 'time', label: 'Horário', gridColumns: 2 },
    { property: 'court', label: 'Quadra', gridColumns: 4 },
    { property: 'teacher', divider: 'Detalhes', label: 'Professor', gridColumns: 6 },
    { property: 'people', label: 'Max. Alunos', gridColumns: 2 },
  ];

  detailValue:any = {} 

  isHideLoading = true
  availabeCourts:any = []
  serviceApi = 'https://64f38ec0edfa0459f6c6aba4.mockapi.io/condomynium/api/v1/availabeCourts'
  fields: Array<PoDynamicFormField> = [
    {
      property: 'dateClass',
      label: 'Data da aula',
      type: 'date',
      format: 'dd/mm/yyyy',
      gridColumns: 3,
      gridSmColumns: 12,
      
    }]

    onLoad() {
      console.log(this.detailValue)
      return this.detailValue
    }

    constructor(private classService: ClassService) {}

    getAvailabeCourts(evento: any) {
      this.detailValue.date = evento
      this.isHideLoading = false
      this.classService.getAvailabeCourts(this.serviceApi, evento).subscribe(
        (data:any) => this.availabeCourts = data,
        () => this.isHideLoading = true,
        () => this.isHideLoading = true)
    }

    onSelectHour(time:any, item:any) {
      this.detailValue.court = item.courtName
      this.detailValue.time = time
    }
}
