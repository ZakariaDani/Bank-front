import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpSignInComponent } from './emp-sign-in/emp-sign-in.component';

const routes: Routes = [
  {
    path: 'employee',
    component: EmpSignInComponent
  },
  {
    path: 'backoffice',
    //add component here
  },
  {
    path: 'backoffice/agents/add',
    //add component here
  },
  {
    path: 'backoffice/agents/:id',
    //add component here
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
