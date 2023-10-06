import { Injectable } from '@angular/core'
import { PoMenuItem } from '@po-ui/ng-components'
import { PeopleService } from './people/people.service'

enum tipoPessoa {
  Teacher = 'Professor',
  Member = 'Aluno',
}

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

  getMenus(): Array<PoMenuItem> {
    if(this.isAdmin()) {
      return [
        { label: 'Inicio', link: '/', icon: 'po-icon-home', shortLabel: 'Início' },
        { label: 'Pessoas', link: '/people', icon: 'po-icon-user', shortLabel: 'Pessoas' },
        { label: 'Aulas', link: '/class', icon: 'po-icon-calendar-ok', shortLabel: 'Aulas' },
        { label: 'Quadras', link: '/court', icon: 'po-icon-target', shortLabel: 'Quadras' },
        { label: 'Calendários', link: '/calendar', icon: 'po-icon-calendar', shortLabel: 'Calendários' },
        { label: 'Reservas', link: '/reservation', icon: 'po-icon-calendar-ok', shortLabel: 'Reservas' },
        { label: 'Esportes', link: '/sport', icon: 'po-icon-like', shortLabel: 'Esportes' },
        { label: 'Sair', link: '/logout', icon: 'po-icon-exit', shortLabel: 'Sair',  }
      ];
    }
    
    const menuAlunos:PoMenuItem[] = [
      { label: 'Inicio', link: '/', icon: 'po-icon-home', shortLabel: 'Início' },
      { label: 'Perfil', link: '/people/profile', icon: 'po-icon-user', shortLabel: 'Perfil' },
      { label: 'Aulas', icon: 'po-icon-calendar', shortLabel: 'Aulas', subItems: [
        { label: 'Minhas aulas', link: '/class/members', icon: 'po-icon-plus', shortLabel: 'Aulas' }, 
        { label: 'Marcar nova aula', link: '/class/members/new', icon: 'po-icon-plus', shortLabel: '+Aula' }, 
      ]},
      { label: 'Reservas', link: '/reservation', icon: 'po-icon-calendar-ok', shortLabel: 'Reservas' },
    ]

    if(this.isTeacher())
      menuAlunos.push({ label: 'Pessoas', link: '/people', icon: 'po-icon-user', shortLabel: 'Pessoas' })

    return menuAlunos
  }

  isAdmin(){
    return localStorage.getItem('role') == Roles.Admin
  }

  setPessoa(){
    return this.peopleService.getPeople({ email: localStorage.getItem('email') }).subscribe((data) => { 
      if(Object.keys(data).length > 0) {
        this.pessoa = data
      }
    })
  }

  getPessoa(){
    return this.pessoa
  }

  isTeacher(){
    return this.pessoa?.tipo === tipoPessoa.Teacher
  }
}
