import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddClientComponent } from '../add-client/add-client.component';
import { ClientsComponent } from '../clients/clients.component';
import { AgentService } from '../services/agent.service';


@Component({
  selector: 'app-nav-bar-agent',
  templateUrl: './nav-bar-agent.component.html',
  styleUrls: ['./nav-bar-agent.component.css']
})
export class NavBarAgentComponent implements OnInit {

  showFiller = false;
  constructor(
    private dialog: MatDialog,
    private backOfficeService: AgentService,
    private router: Router
  ) {}

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
      height: '60vh',
    });
    dialogAdd.afterClosed().subscribe((data) => {
      this.backOfficeService.createClient(data).subscribe((result: any) => {
        console.log(result);
        this.clients.push(result);
        this.backOfficeService.createClient(null);
      });
    });
  }
  logout() {
    this.backOfficeService.logout();
  }
}
