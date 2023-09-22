import { Component } from '@angular/core'
import { PoDynamicFormField, PoStepperOrientation } from '@po-ui/ng-components'
import { ClassService } from '../class.service'

@Component({
  selector: 'app-class-new',
  templateUrl: './class-new.component.html',
  styleUrls: ['./class-new.component.css'],
  providers: [ClassService]
})
export class ClassNewComponent {
  public readonly orientation:PoStepperOrientation = PoStepperOrientation.Horizontal

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

    yes() {
      return true
    }

    constructor(private classService: ClassService) {}

    getAvailabeCourts(evento: any) {
      this.isHideLoading = false
      this.classService.getAvailabeCourts(this.serviceApi, evento).subscribe(
        (data:any) => this.availabeCourts = data,
        () => this.isHideLoading = true,
        () => this.isHideLoading = true)
    }

    onSelectHour(time:any, item:any) {
      console.log(time,item)
    }
}
