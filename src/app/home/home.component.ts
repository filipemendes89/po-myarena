import { Component } from '@angular/core'
import { PoBreadcrumb, PoMenuItem, PoPageAction, PoTableColumn } from '@po-ui/ng-components'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  paymentLink: string = 'https://www.google.com.br/search?q=days+to+payment';
  itemsDetails: Array<any> = []
  titleDetailsModal: string = ''
  typeChart: string = 'line';

  readonly actions:PoPageAction[] = [
    { label: 'Logout', url: '/logout', icon: 'po-icon-exit' }
  ]
  readonly menus: Array<PoMenuItem> = [
    { label: 'Inicio', link: '/', icon: 'po-icon-home', shortLabel: 'Início' },
    { label: 'Pessoas', link: '/people', icon: 'po-icon-user', shortLabel: 'Pessoas' },
    { label: 'Aulas', link: '/class', icon: 'po-icon-calendar-ok', shortLabel: 'Aulas' },
    { label: 'Quadras', link: '/court', icon: 'po-icon-target', shortLabel: 'Quadras' },
    { label: 'Calendários', link: '/calendar', icon: 'po-icon-calendar', shortLabel: 'Calendários' },
    { label: 'Estoque', link: '/object', icon: 'po-icon-stock', shortLabel: 'Estoque' }
  ];

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }]
  }
  
  public readonly columnsDetails: Array<PoTableColumn> = [
    { property: 'dateUpdate', label: 'Date update', type: 'date' },
    { property: 'statement', label: 'Statement', type: 'currency' }
  ];

  public readonly itemsAccountDetails: Array<any> = [
    { dateUpdate: '03-05-2018', statement: '-56.45' },
    { dateUpdate: '02-05-2018', statement: '-14.99' },
    { dateUpdate: '02-05-2018', statement: '-657.56' },
    { dateUpdate: '12-05-2017', statement: '3547.29' }
  ];

  public readonly itemsSavingsDetails: Array<any> = [
    { dateUpdate: '03-05-2018', statement: '-300' },
    { dateUpdate: '03-05-2018', statement: '2000' },
    { dateUpdate: '02-05-2018', statement: '1500' },
    { dateUpdate: '02-05-2018', statement: '-200' },
    { dateUpdate: '12-05-2017', statement: '2000' }
  ];

  daysPayment() {
    window.open(this.paymentLink, '_blank');
  }
}
