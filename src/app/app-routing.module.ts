import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientRegisterComponent } from './client-register/client-register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ClientServiceComponent } from './client-service/client-service.component';

import { AgentProfileComponent } from './agent-profile/agent-profile.component';
import { BackofficeSettingsComponent } from './backoffice-settings/backoffice-settings.component';

import { HomeComponent } from './home/home.component';

import { ClientProfileComponent } from './client-profile/client-profile.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientHistoryComponent } from './client-history/client-history.component';
import { NavBarAgentComponent } from './nav-bar-agent/nav-bar-agent.component';
import { AddClientComponent } from './add-client/add-client.component';
import { AgentSettingsComponent } from './agent-settings/agent-settings.component';
import { AuthGuard } from './guards/auth.guard';





const routes: Routes = [
  {
    path: 'agent',
    component: NavBarAgentComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_AGENT'
    }
  },
  {
    path: 'backoffice',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_BACKOFFICE'
    }
  },
  {
    path: '',
    component: SignInComponent,

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
      role: 'ROLE_CLIENT'
    },
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
   canActivate: [AuthGuard],
   data: {
    role: 'ROLE_BACKOFFICE'
  }
  },
  {
    path: 'backoffice/agents/:id',
    component: AgentProfileComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_BACKOFFICE'
    }
  },
  {
    path: 'agent/client/:id',
    component: ClientProfileComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_AGENT'
    }
  },
  {
    path: 'agent/settings',
    component: AgentSettingsComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_AGENT'
    }
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
