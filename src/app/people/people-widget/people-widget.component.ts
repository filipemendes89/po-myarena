import { Component, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { PoDynamicViewField, PoInfoOrientation, PoNotificationService, PoToasterType } from '@po-ui/ng-components'
import { PeopleService } from '../people.service'

enum Level {
  Estreante = 1,
  Iniciante = 2,
  Intermediário = 3,
  Avançado = 4
}
@Component({
  selector: 'app-people-widget',
  templateUrl: './people-widget.component.html',
  styleUrls: ['./people-widget.component.css'],
  inputs: ['pessoa']
})
export class PeopleWidgetComponent {
  @ViewChild('pageSlideNivel') pageSlideNivel: any
  @ViewChild('dynamicForm') dynamicForm: any

  public pessoa: any
  public readonly orientationInfo: PoInfoOrientation = PoInfoOrientation.Horizontal
  constructor(private _router:Router, private peopleService: PeopleService, private poNotification: PoNotificationService){}

  niveis = [
    { label: 'Estreante', value: Level.Estreante },
    { label: 'Iniciante', value: Level.Iniciante },
    { label: 'Intermediário', value: Level.Intermediário },
    { label: 'Avançado', value: Level.Avançado },
  ]

  public readonly fields: Array<PoDynamicViewField> = [
    { property: 'email',divider:'Contatos', icon: 'po-icon-mail', gridColumns: 6,  gridSmColumns: 12 },
    { property: 'phone', format: '(99) 99999-9999', gridColumns: 6, icon: 'po-icon-telephone', gridSmColumns: 12 },
    { property: 'instagram', gridColumns: 6, icon: 'po-icon-social-instagram', gridSmColumns: 12,  },
    { property: 'sports', gridColumns: 12, label: "", divider: 'Esportes' },
  ];
  editPeople(event: any) {
    this._router.navigateByUrl(`/people/edit/${event.pessoa._id}`)
  }

  openPageSlide(){
    this.pageSlideNivel.open()
  }

  saveNivel(nivel: Level, sport: any){
    const levels = this.pessoa.levels ?? []
    const sportFound = levels.find((nivelFound:any) => sport === nivelFound.sport)

    if(sportFound)
      sportFound.levelNumber = nivel
    else
      levels.push({ sport, levelNumber: nivel })

    this.pessoa.levels = levels
    this.peopleService.putPerson(this.pessoa, this.pessoa._id).subscribe({
      complete: () => {
        this.poNotification.setDefaultDuration(2000)
        this.poNotification.createToaster({
          message: 'Nível alterado com sucesso',
          type: PoToasterType.Success,
          duration: 2000,
          position: 1
        })
      },
      error: (error) => {
        this.poNotification.error('Erro na alteração do nível')
        this.poNotification.error(error)
      }
    })
  }

  getNivel(sport: string){
    return this.pessoa.levels?.find((n:any) => n.sport === sport)?.levelNumber
  }
}
