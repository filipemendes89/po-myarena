import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ClassNewComponent } from './class-new/class-new.component'
import { ClassListComponent } from './class-list/class-list.component';

const routes: Routes = [{
  path: 'new',
  component: ClassNewComponent
},
{
  path: '',
  component: ClassListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule { }
