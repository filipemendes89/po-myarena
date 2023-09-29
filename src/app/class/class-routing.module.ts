import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ClassListComponent } from './class-list/class-list.component'
import { ClassNewComponent } from './class-new/class-new.component'
import { ClassGuard } from './class.guard'

const routes: Routes = [{
  path: 'new',
  component: ClassNewComponent
},
{
  path: '',
  component: ClassListComponent,
  canActivate: [ClassGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule { }
