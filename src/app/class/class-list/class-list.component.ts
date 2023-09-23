import { Component } from '@angular/core';
import { ClassService } from '../class.service';
import { PoBreadcrumb, PoNotificationService, PoPageAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent {

  public readonly actions: PoPageAction[] = [{
    icon: 'po-icon-plus',
    label: 'Novo',
    url: 'class/new'
  }]

  public readonly breadcrumb:PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Class' }]
  }

  classApi = 'https://64f38ec0edfa0459f6c6aba4.mockapi.io/condomynium/api/v1/class'
  isHideLoading = true

  constructor(private classService: ClassService, private poNotification: PoNotificationService) {}
  classes:any

  ngOnInit() {
    this.isHideLoading = false
    this.classService.getClass(this.classApi).subscribe(
    (data: any) => { 
      this.classes = data 
      this.isHideLoading = true
    }, 
    (error) => {
      this.poNotification.error(error)
      this.isHideLoading = true
    })
  }
}
