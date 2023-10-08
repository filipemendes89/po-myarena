import { Component } from '@angular/core'
import { AuthService } from '@auth0/auth0-angular'
import { PoBreadcrumb, PoChartSerie, PoChartType, PoMenuItem, PoToolbarAction } from '@po-ui/ng-components'
import { AppService } from '../app.service'

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  sportByPeopleChartType: PoChartType = PoChartType.Donut;
  sportsByPeople: Array<PoChartSerie> = []

  constructor(private auth: AuthService, private appService: AppService) {}
  paymentLink: string = 'https://www.google.com.br/search?q=days+to+payment';
  itemsDetails: Array<any> = []
  titleDetailsModal: string = ''
  typeChart: string = 'line';
  isHideLoading = true
  profile:any
  
  readonly profileActions:PoToolbarAction[] = [
    { label: 'Perfil', url: '/people/profile', icon: 'po-icon-user', type: 'primary' },
    { label: 'Logout', url: '/logout', icon: 'po-icon-exit', type: 'danger' }
  ];
  
  public menus: Array<PoMenuItem> = [
    { label: 'Inicio', link: '/', icon: 'po-icon-home', shortLabel: 'Início' },
  ]

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Statistics', link: '/' }]
  }

  ngOnInit(): void {    
    this.profile = {
      avatar: this.appService.getPessoa().avatar,
      title: this.appService.getPessoa().name,
      subtitle: this.appService.getPessoa().email
    }

    this.menus = this.appService.getMenus()

    this.isHideLoading = false  
    this.appService.getStatistics().subscribe((data:any) => {
      this.sportsByPeople = data.sportByPeople
      this.isHideLoading = true
    })
  }
}
