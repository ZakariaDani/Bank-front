import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditAgentComponent } from '../edit-agent/edit-agent.component';
import { BackOfficeService } from '../services/back-office.service';

@Component({
  selector: 'app-single-agent',
  templateUrl: './single-agent.component.html',
  styleUrls: ['./single-agent.component.css'],
})
export class SingleAgentComponent implements OnInit {
  @Input() agent: any;
  @Input() agents: any;

  constructor(
    private dialog: MatDialog,
    private backOfficeService: BackOfficeService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getImageUrl() {
    return `https://avatars.dicebear.com/api/adventurer/${this.agent.firstName}.svg`;
  }

  goToProfilePage(id: string) {
    this.router.navigate(['backoffice', 'agents', id]);
  }

  toggleFavorite(agent: any) {
    agent.isFavorite = !agent.isFavorite;
  }

  deleteAgent(agent: any) {
    this.backOfficeService.deleteAgent(agent.email).subscribe((res) => {
      this.agents.splice(this.agents.indexOf(agent), 1);
      console.log(res);
    });
  }

  openDialog() {
    const dialogAdd = this.dialog.open(EditAgentComponent, {
      data: this.agent,
      width: '50vw',
      hasBackdrop: true,
      role: 'dialog',
      height: '50vh',
    });
  }
}
