import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PoInfoOrientation } from '@po-ui/ng-components'
import { AppService } from 'src/app/app.service'
import { PeopleService } from '../people.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PeopleService]
})
export class ProfileComponent {
  constructor(private appService: AppService, private _router: Router) {
  }

  public readonly orientationInfo: PoInfoOrientation = PoInfoOrientation.Horizontal
  public readonly serviceApi = 'https://myarenaapi.azurewebsites.net/api/people';
  pessoa:any = {
    email: localStorage.getItem('email'),
    nome: localStorage.getItem('name'),
    avatar: localStorage.getItem('picture')
  }

  ngOnInit() {
    const pessoaCadastrada = this.appService.getPessoa()

    if(pessoaCadastrada)
      this.pessoa = pessoaCadastrada
  }

  editPeople(event: any) {
    this._router.navigateByUrl(`/people/new`, { state: { pessoa: event.pessoa } })
  }
}
