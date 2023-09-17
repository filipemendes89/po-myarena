import { Component } from '@angular/core'

import { PoMenuItem } from '@po-ui/ng-components'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
    { label: 'Inicio', link: '/', icon: 'po-icon-home', shortLabel: 'Início' },
    { label: 'Pessoas', link: '/people', icon: 'po-icon-user', shortLabel: 'Pessoas' },
    { label: 'Unidades', link: '/unit', icon: 'po-icon-company', shortLabel: 'Unidades' },
    { label: 'Pacotes', link: '/object', icon: 'po-icon-company', shortLabel: 'Pacotes' }
  ];

  private onClick() {
    alert('Clicked in menu item')
  }

}
