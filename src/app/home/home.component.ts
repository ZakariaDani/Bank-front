import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAgentComponent } from '../add-agent/add-agent.component';
import { BackOfficeService } from '../services/back-office.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showFiller = false;
  constructor(private dialog: MatDialog, private backOfficeService: BackOfficeService) {}

  agents: any = [];
  filteredAgents: any[] = [];

  ngOnInit(): void {}

  openDialog() {
    const dialogAdd = this.dialog.open(AddAgentComponent, {
      width: '50vw',
      hasBackdrop: true,
      role: 'dialog',
      height: '60vh',
    });
    dialogAdd.afterClosed().subscribe((data) => {
      this.backOfficeService
        .createAgent(data)
        .subscribe((result: any) => {
          console.log(result);
          this.agents.push(result);
          this.filteredAgents = this.agents;
        });
    });
  }
}
