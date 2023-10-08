import { Component } from '@angular/core'
import { AuthService } from '@auth0/auth0-angular'
import { PoBreadcrumb, PoChartSerie, PoChartType, PoMenuItem, PoTableColumn, PoToolbarAction } from '@po-ui/ng-components'
import { AppService } from '../app.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  sportByPeopleChartType: PoChartType = PoChartType.Donut;
  sportsByPeople: Array<PoChartSerie> = []

  constructor(private auth: AuthService, private appService: AppService) {}
  paymentLink: string = 'https://www.google.com.br/search?q=days+to+payment';
  itemsDetails: Array<any> = []
  titleDetailsModal: string = ''
  typeChart: string = 'line';
  isHideLoading = true
  
  readonly profileActions:PoToolbarAction[] = [
    { label: 'Perfil', url: '/people/profile', icon: 'po-icon-user', type: 'primary' },
    { label: 'Logout', url: '/logout', icon: 'po-icon-exit', type: 'danger' }
  ];
  
  public menus: Array<PoMenuItem> = [
    { label: 'Inicio', link: '/', icon: 'po-icon-home', shortLabel: 'Início' },
  ]

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

  profile:any

  daysPayment() {
    window.open(this.paymentLink, '_blank');
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.isHideLoading = false  
    this.auth.user$.subscribe((data:any) => { 
        this.profile = {
          avatar: data.picture,
          title: data.name,
          subtitle: data.email
        }
        
        localStorage.setItem('email', data.email)
        localStorage.setItem('name', data.name)
        localStorage.setItem('picture', data.picture)
        localStorage.setItem('role', data['https://myarena/roles']?.[0])

        this.appService.setPessoa().add(() => {
          this.menus = this.appService.getMenus()
          this.isHideLoading = true
        })
      })
    this.appService.getStatistics().subscribe((data:any) => {
      this.sportsByPeople = data.sportByPeople
    })
  }
}
