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
  reservationType: PoChartType = PoChartType.Bar
  classType: PoChartType = PoChartType.Line
  
  sportsByPeople: Array<PoChartSerie> = []
  reservationsLastMonths: Array<PoChartSerie> = []
  classLastYear: Array<PoChartSerie> = []

  classCategories: Array<any> = []

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
      avatar: this.appService.getPessoa()?.avatar,
      title: this.appService.getPessoa()?.name,
      subtitle: this.appService.getPessoa()?.email
    }

    this.menus = this.appService.getMenus()

    this.isHideLoading = false  
    this.appService.getStatistics().subscribe((data:any) => {
      this.sportsByPeople = data.sportByPeople
      this.reservationsLastMonths = data.reservationByMonth.sort((a: any, b: any) => a.date > b.date ? 1 : -1)
            
      this.classLastYear = this.tratarRetornoClass(data.getMembersInClass)
      this.classCategories = data.categories
      this.isHideLoading = true
    })
  }

  tratarRetornoClass(data:Array<any>){
    data.forEach((classNumber: any) => {
      classNumber.data.sort((a: any, b: any) => a.date > b.date ? 1 : -1)
      classNumber.data = <any>classNumber.data.map((dados: any) => dados.total).flat(3)
    })

    return data
  }
}
