import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientRegisterComponent } from './client-register/client-register.component';
import { SignInComponent } from './sign-in/sign-in.component';

import { AgentProfileComponent } from './agent-profile/agent-profile.component';
import { BackofficeSettingsComponent } from './backoffice-settings/backoffice-settings.component';

import { BackofficeHomeComponent } from './backoffice-home/backoffice-home.component';

import { ClientProfileComponent } from './client-profile/client-profile.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientHistoryComponent } from './client-history/client-history.component';
import { NavBarAgentComponent } from './nav-bar-agent/nav-bar-agent.component';
import { AgentSettingsComponent } from './agent-settings/agent-settings.component';
import { AuthGuard } from './guards/auth.guard';
import { ClientMainPageComponent } from './client-main-page/client-main-page.component';
import { AgentsComponent } from './agents/agents.component';
import { BookmarkedAgentsComponent } from './bookmarked-agents/bookmarked-agents.component';
import { AgentClientProfileComponent } from './agent-client-profile/agent-client-profile.component';

import { AgentsMostClientsComponent } from './agents-most-clients/agents-most-clients.component';
import { AgentsLeastClientsComponent } from './agents-least-clients/agents-least-clients.component';

import { LoginGuard } from './guards/login.guard';
import { ClientNewPasswordComponent } from './client-new-password/client-new-password.component';

const routes: Routes = [
  {
    path: 'agent',
    component: NavBarAgentComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_AGENT',
    },
  },
  {
    path: 'agent/client/:id',
    component: AgentClientProfileComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_AGENT',
    },
  },
  {
    path: 'backoffice',
    component: BackofficeHomeComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_BACKOFFICE',
    },
    children: [
      {
        path: 'settings',
        component: BackofficeSettingsComponent,
      },
      {
        path: '',
        component: AgentsComponent,
      },
      {
        path: 'bookmarked',
        component: BookmarkedAgentsComponent,
      },
      {
        path: 'mostClients',
        component: AgentsMostClientsComponent,
      },
      {
        path: 'leastClients',
        component: AgentsLeastClientsComponent,
      },
      {
        path: 'agents/:id',
        component: AgentProfileComponent,
      },
    ],
  },
  {
    path: '',
    component: SignInComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'client-register',
    component: ClientRegisterComponent,
  },
  {
    path: 'client-home',
    component: ClientHomeComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_CLIENT',
    },
    children: [
      {
        path: 'profile',
        component: ClientProfileComponent,
      },
      {
        path: 'history',
        component: ClientHistoryComponent,
      },
      {
        path: '',
        component: ClientMainPageComponent,
      },
    ],
  },

  {
    path: 'agent/client/:id',
    component: ClientProfileComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_AGENT',
    },
  },
  {
    path: 'agent/settings',
    component: AgentSettingsComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_AGENT',
    },
  },
  {
    path: 'newPassword',
    component: ClientNewPasswordComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_CLIENT',
    },
  },  
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
