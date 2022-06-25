import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddAgentComponent } from '../add-agent/add-agent.component';
import { AgentsComponent } from '../agents/agents.component';
import { SigninService } from '../services/signin.service';
import { ValueService } from '../services/value.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showFiller = false;
  isFavoriteAgentsShown = false;

  @ViewChild(AgentsComponent)
  agentsComponent!: AgentsComponent;
  constructor(
    private dialog: MatDialog,
    private signinService: SigninService,
    private router: Router,
    private valueService: ValueService
  ) {}

  ngOnInit(): void {}

  goToSettingsPage() {
    this.router.navigate(['backoffice/settings']);
  }

  showBookmarkedAgents() {
    this.router.navigate(['backoffice/bookmarked']);
  }

  showAllAgents() {
    this.router.navigate(['backoffice']);
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
      data: this.valueService.agents,
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
