import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BackofficeHomeComponent } from './backoffice-home/backoffice-home.component';
import { HeaderComponent } from './header/header.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AgentsComponent } from './agents/agents.component';
import { SingleAgentComponent } from './single-agent/single-agent.component';
import { ToastrModule } from 'ngx-toastr';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { SignInComponent } from './sign-in/sign-in.component';
import { ClientRegisterComponent } from './client-register/client-register.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { EditAgentComponent } from './edit-agent/edit-agent.component';
import { AgentProfileComponent } from './agent-profile/agent-profile.component';
import { TimelineComponent } from './timeline/timeline.component';
import { MenuThemeComponent } from './menu-theme/menu-theme.component';
import { StyleManagerService } from './services/style-manager.service';
import { ThemeService } from './services/theme.service';

import { BackofficeSettingsComponent } from './backoffice-settings/backoffice-settings.component';

import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientHistoryComponent } from './client-history/client-history.component';

import { NavBarAgentComponent } from './nav-bar-agent/nav-bar-agent.component';
import { ClientsComponent } from './clients/clients.component';
import { AddClientComponent } from './add-client/add-client.component';
import { SingleClientComponent } from './single-client/single-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { AgentSettingsComponent } from './agent-settings/agent-settings.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { ClientMainPageComponent } from './client-main-page/client-main-page.component';

import { BackOfficeService } from './services/back-office.service';
import { AgentService } from './services/agent.service';
import { MatNativeDateModule } from '@angular/material/core';
import { AssigneClientComponent } from './assigne-client/assigne-client.component';
import { BookmarkedAgentsComponent } from './bookmarked-agents/bookmarked-agents.component';
import { AgentClientProfileComponent } from './agent-client-profile/agent-client-profile.component';
import { ClientNewPasswordComponent } from './client-new-password/client-new-password.component';
import { AgentsMostClientsComponent } from './agents-most-clients/agents-most-clients.component';
import { AgentsLeastClientsComponent } from './agents-least-clients/agents-least-clients.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    BackofficeHomeComponent,
    HeaderComponent,
    AgentsComponent,
    SingleAgentComponent,
    AddAgentComponent,

    SignInComponent,
    ClientRegisterComponent,

    EditAgentComponent,
    AgentProfileComponent,
    TimelineComponent,

    MenuThemeComponent,

    BackofficeSettingsComponent,
    ClientHomeComponent,
    ClientHistoryComponent,

    NavBarAgentComponent,
    ClientsComponent,
    AgentsComponent,
    AddClientComponent,
    SingleClientComponent,
    EditAgentComponent,
    EditClientComponent,
    ClientsComponent,
    ClientProfileComponent,
    AddClientComponent,
    AgentSettingsComponent,
    ClientMainPageComponent,
    AssigneClientComponent,
    BookmarkedAgentsComponent,
    AgentClientProfileComponent,
    ClientNewPasswordComponent,
    AgentsMostClientsComponent,
    AgentsLeastClientsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatMenuModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
    }),

  ],
  providers: [StyleManagerService, ThemeService, BackOfficeService,AgentService,MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
