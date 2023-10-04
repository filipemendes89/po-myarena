import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ClassListComponent } from './class-list/class-list.component'
import { ClassNewComponent } from './class-new/class-new.component'
import { ClassGuard } from './class.guard'
import { MembersClassListComponent } from './members-class-list/members-class-list.component'
import { MembersClassNewComponent } from './members-class-new/members-class-new.component'
import { MembersClassGuard } from './members-class.guard'

const routes: Routes = [{
  path: 'new',
  component: ClassNewComponent,
  canActivate: [ClassGuard]
},
{
  path: '',
  component: ClassListComponent,
  canActivate: [ClassGuard]
},
{
  path: 'members',
  component: MembersClassListComponent,
  canActivate: [MembersClassGuard]
},
{
  path: 'members/new',
  component: MembersClassNewComponent,
  canActivate: [MembersClassGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule { }
