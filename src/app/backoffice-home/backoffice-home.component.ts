import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AddAgentComponent } from '../add-agent/add-agent.component';
import { AgentsComponent } from '../agents/agents.component';
import { SigninService } from '../services/signin.service';
import { ValueService } from '../services/value.service';

@Component({
  selector: 'app-backoffice-home',
  templateUrl: './backoffice-home.component.html',
  styleUrls: ['./backoffice-home.component.css'],
})
export class BackofficeHomeComponent implements OnInit {
  showFiller = false;
  isFavoriteAgentsShown = false;

  @ViewChild(AgentsComponent)
  agentsComponent!: AgentsComponent;

  constructor(
    private dialog: MatDialog,
    private signinService: SigninService,
    private router: Router,
    private valueService: ValueService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Back Office');
  }

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
    this.router.navigate(['backoffice/mostClients']);
    this.agentsComponent.showAgentsWithMostClients();
  }

  showAgentsWithLeastClients() {
    this.isFavoriteAgentsShown = false;
    this.router.navigate(['backoffice/leastClients']);
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
