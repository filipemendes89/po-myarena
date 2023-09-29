import { Injectable } from '@angular/core'
import { PoMenuItem } from '@po-ui/ng-components'
import { PeopleService } from './people/people.service'

enum Roles {
  Admin = 'admin',
  User = 'user',
}
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private peopleService: PeopleService) { }
  private pessoa:any

  getMenus(isAdmin: boolean): Array<PoMenuItem> {
    console.log(isAdmin)
    if(isAdmin) {
      return [
        { label: 'Inicio', link: '/', icon: 'po-icon-home', shortLabel: 'Início' },
        { label: 'Pessoas', link: '/people', icon: 'po-icon-user', shortLabel: 'Pessoas' },
        { label: 'Aulas', link: '/class', icon: 'po-icon-calendar-ok', shortLabel: 'Aulas' },
        { label: 'Quadras', link: '/court', icon: 'po-icon-target', shortLabel: 'Quadras' },
        { label: 'Calendários', link: '/calendar', icon: 'po-icon-calendar', shortLabel: 'Calendários' },
        { label: 'Estoque', link: '/object', icon: 'po-icon-stock', shortLabel: 'Estoque' },
        { label: 'Sair', link: '/logout', icon: 'po-icon-exit', shortLabel: 'Sair',  }
      ];
    }
    
    return [
      { label: 'Inicio', link: '/', icon: 'po-icon-home', shortLabel: 'Início' },
      { label: 'Perfil', link: '/people/profile', icon: 'po-icon-user', shortLabel: 'Perfil' },
      { label: 'Aulas', link: '/class', icon: 'po-icon-calendar', shortLabel: 'Aulas' },
      { label: 'Reservas', link: '/reservation', icon: 'po-icon-calendar-ok', shortLabel: 'Reservas' },
    ]
  }

  isAdmin(){
    return localStorage.getItem('role') == Roles.Admin
  }

  setPessoa(){
    this.peopleService.getPeople(`${this.peopleService.endpoint}?email=${localStorage.getItem('email')}`).subscribe((data:any) => { 
      console.log(data)
      if(Object.keys(data).length > 0) {
        this.pessoa = data
      }
    })
  }

  getPessoa(){
    return this.pessoa
  }
}
