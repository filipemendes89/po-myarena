import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CourtListComponent } from './court-list/court-list.component'
import { CourtNewComponent } from './court-new/court-new.component'

const routes: Routes = [{
  path: '',
  component: CourtListComponent
},
{
  path: 'new',
  component: CourtNewComponent
},
{
  path: 'edit/:id',
  component: CourtNewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourtRoutingModule { }
