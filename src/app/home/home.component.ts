import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddAgentComponent } from '../add-agent/add-agent.component';
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
    private signinService: SigninService,
    private router: Router
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
  }

  showAgentsWithLeastClients() {
  }

  openDialog() {
    const dialogAdd = this.dialog.open(AddAgentComponent, {
      //data: this.agents,
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
