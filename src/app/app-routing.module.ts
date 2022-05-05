import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientRegisterComponent } from './client-register/client-register.component';
import { ClientSignInComponent } from './client-sign-in/client-sign-in.component';
import { EmpSignInComponent } from './emp-sign-in/emp-sign-in.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'backoffice',
    pathMatch: 'full',
  },
  {
    path: 'backoffice',
    component: HomeComponent,
  },
  {
    path: 'emp-signin',
    component: EmpSignInComponent,
  },
  {
    path: 'client-signin',
    component: ClientSignInComponent,

  },
  {
    path: 'client-register',
    component: ClientRegisterComponent,

  },
  

  // {
  //   path: 'backoffice/agents/add',
  //   add component here
  // },
  // {
  //   path: 'backoffice/agents/:id',
  //   add component here
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
