import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientRegisterComponent } from './client-register/client-register.component';
import { ClientSignInComponent } from './client-sign-in/client-sign-in.component';
import { ClientServiceComponent } from './client-service/client-service.component';

import { AgentProfileComponent } from './agent-profile/agent-profile.component';
import { BackofficeSettingsComponent } from './backoffice-settings/backoffice-settings.component';

import { EmpSignInComponent } from './emp-sign-in/emp-sign-in.component';
import { HomeComponent } from './home/home.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientHistoryComponent } from './client-history/client-history.component';

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
  {
    path: 'client-home',
    component: ClientHomeComponent,
    children:[  
      {
      path:"profile",
      component:ClientProfileComponent
      },
      {
        path:"history",
        component:ClientHistoryComponent
      },
      {
        path:"",
        component:ClientServiceComponent
      }
    ]
  },
  

  {
    path: 'backoffice/settings',
   component: BackofficeSettingsComponent,
  },
  {
    path: 'backoffice/agents/:id',
    component: AgentProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
