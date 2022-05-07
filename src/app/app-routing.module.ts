import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientRegisterComponent } from './client-register/client-register.component';
import { ClientSignInComponent } from './client-sign-in/client-sign-in.component';

import { AgentProfileComponent } from './agent-profile/agent-profile.component';
import { BackofficeSettingsComponent } from './backoffice-settings/backoffice-settings.component';

import { EmpSignInComponent } from './emp-sign-in/emp-sign-in.component';
import { HomeComponent } from './home/home.component';
import { NavBarAgentComponent } from './nav-bar-agent/nav-bar-agent.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { AddClientComponent } from './add-client/add-client.component';
import { AgentSettingsComponent } from './agent-settings/agent-settings.component';





const routes: Routes = [
  {
    path: '',
    redirectTo: 'backoffice',
    pathMatch: 'full',
  },
  {
    path: 'agent',
    component: NavBarAgentComponent,
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
    path: 'backoffice/settings',
   component: BackofficeSettingsComponent,
  },
  {
    path: 'backoffice/agents/:id',
    component: AgentProfileComponent,
  },
  {
    path: 'agent/client/:id',
    component: ClientProfileComponent,
  },
  {
    path: 'agent/settings',
    component: AgentSettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
