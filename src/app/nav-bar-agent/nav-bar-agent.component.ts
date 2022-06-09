import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AddClientComponent } from '../add-client/add-client.component';
import { ClientsComponent } from '../clients/clients.component';
import { AgentService } from '../services/agent.service';
import { SigninService } from '../services/signin.service';


@Component({
  selector: 'app-nav-bar-agent',
  templateUrl: './nav-bar-agent.component.html',
  styleUrls: ['./nav-bar-agent.component.css']
})
export class NavBarAgentComponent implements OnInit {

  showFiller = false;
  constructor(
    private dialog: MatDialog,
    private agentService: AgentService,
    private signinService: SigninService,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle("Home Agent");
  }

  clients: any = [];
  isFavoriteclientsShown = false;

  @ViewChild(ClientsComponent)
  clienstComponent!: ClientsComponent;

  ngOnInit(): void {}

  goToSettingsPage() {
    this.router.navigate(['agent', 'settings']);
  }

  showBookmarkedClients() {
    this.isFavoriteclientsShown = true;
    this.clienstComponent.showBookmarkedclients();
  }

  showMyClients() {
    this.isFavoriteclientsShown = false;
    this.clienstComponent.showAllclients();
  }

  openDialog() {
    const dialogAdd = this.dialog.open(AddClientComponent, {
      width: '50vw',
      hasBackdrop: true,
      role: 'dialog',
    }).close(()=>{this.ngOnInit})
  }
  logout() {
    this.signinService.logout();
  }
}
