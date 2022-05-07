import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
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
import { EmpSignInComponent } from './emp-sign-in/emp-sign-in.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AgentsComponent } from './agents/agents.component';
import { SingleAgentComponent } from './single-agent/single-agent.component';
import { ToastrModule } from 'ngx-toastr';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { ClientSignInComponent } from './client-sign-in/client-sign-in.component';
import { ClientRegisterComponent } from './client-register/client-register.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { EditAgentComponent } from './edit-agent/edit-agent.component';
import { AgentProfileComponent } from './agent-profile/agent-profile.component';
import { TimelineComponent } from './timeline/timeline.component';
import { MenuThemeComponent } from './menu-theme/menu-theme.component';
import { StyleManagerService } from './services/style-manager.service';
import { ThemeService } from './services/theme.service';

import { BackofficeSettingsComponent } from './backoffice-settings/backoffice-settings.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientServiceComponent } from './client-service/client-service.component';
import { ClientHistoryComponent } from './client-history/client-history.component';



export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    EmpSignInComponent,
    HomeComponent,
    HeaderComponent,
    AgentsComponent,
    SingleAgentComponent,
    AddAgentComponent,

    ClientSignInComponent,
    ClientRegisterComponent,

    EditAgentComponent,
    AgentProfileComponent,
    TimelineComponent,

    MenuThemeComponent,


    BackofficeSettingsComponent,
        ClientProfileComponent,
        ClientHomeComponent,
        ClientServiceComponent,
        ClientHistoryComponent,

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
    HttpClientModule,
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
  providers: [StyleManagerService, ThemeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
