import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientRegisterComponent } from './client-register/client-register.component';
import { ClientSignInComponent } from './client-sign-in/client-sign-in.component';
import { NavBarAgentComponent } from './nav-bar-agent/nav-bar-agent.component';

import { AgentProfileComponent } from './agent-profile/agent-profile.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { BackofficeSettingsComponent } from './backoffice-settings/backoffice-settings.component';

import { EmpSignInComponent } from './emp-sign-in/emp-sign-in.component';
import { HomeComponent } from './home/home.component';
import { AgentSettingsComponent } from './agent-settings/agent-settings.component';

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
    path: 'agent',
    component: NavBarAgentComponent,
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
    path: 'agent/settings',
    component: AgentSettingsComponent,
  },
  {
    path: 'backoffice/agents/:id',
    component: AgentProfileComponent,
  },
  {
    path: 'agent/client/:id',
    component: ClientProfileComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
