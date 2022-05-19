import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddAgentComponent } from '../add-agent/add-agent.component';
import { AgentsComponent } from '../agents/agents.component';
import { BackOfficeService } from '../services/back-office.service';
import { SigninService } from '../services/signin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showFiller = false;
  constructor(
    private dialog: MatDialog,
    private backOfficeService: BackOfficeService,
    private signinService: SigninService,
    private router: Router
  ) {}

  agents: any = [];
  isFavoriteAgentsShown = false;

  @ViewChild(AgentsComponent)
  agentsComponent!: AgentsComponent;

  ngOnInit(): void {}

  goToSettingsPage() {
    this.router.navigate(['backoffice', 'settings']);
  }

  showBookmarkedAgents() {
    this.isFavoriteAgentsShown = true;
    this.agentsComponent.showBookmarkedAgents();
  }

  showAllAgents() {
    this.isFavoriteAgentsShown = false;
    this.agentsComponent.showAllAgents();
  }

  showAgentsWithMostClients() {
    this.isFavoriteAgentsShown = false;

    this.agentsComponent.showAgentsWithMostClients();
  }

  showAgentsWithLeastClients() {
    this.isFavoriteAgentsShown = false;

    this.agentsComponent.showAgentsWithLeastClients();
  }

  openDialog() {
    const dialogAdd = this.dialog.open(AddAgentComponent, {
      data: this.agents,
      width: '50vw',
      hasBackdrop: true,
      role: 'dialog',
      height: '60vh',
    });
  }
  logout() {
    this.signinService.logout();
  }
}
