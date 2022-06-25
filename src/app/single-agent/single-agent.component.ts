import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditAgentComponent } from '../edit-agent/edit-agent.component';
import { Agent } from '../models/agent.model';
import { BackOfficeService } from '../services/back-office.service';
import { ValueService } from '../services/value.service';

@Component({
  selector: 'app-single-agent',
  templateUrl: './single-agent.component.html',
  styleUrls: ['./single-agent.component.css'],
})
export class SingleAgentComponent implements OnInit {
  @Input() agent?: Agent;

  constructor(
    private dialog: MatDialog,
    private backOfficeService: BackOfficeService,
    private router: Router,
    private valueService: ValueService
  ) {}

  ngOnInit(): void {}

  getImageUrl() {
    return `https://avatars.dicebear.com/api/adventurer/${this.agent?.firstName}.svg`;
  }

  goToProfilePage() {
    this.valueService.agents.forEach((a: Agent) => {
      if (a.email === this.agent?.email) {
        console.log('hohooooooooooooooooo', a.idCardNumber);

        this.router.navigate(['backoffice', 'agents', a.idCardNumber]);
      }
    });
  }

  toggleFavorite(agent: Agent) {
    this.backOfficeService.addToFavourite(agent).subscribe((res) => {
      console.log(res, '546541345');
      this.agent!.favorite = !agent.favorite;
      if (!this.agent!.favorite) {
        this.valueService.bookmarked.splice(
          this.valueService.bookmarked.indexOf(this.agent),
          1
        );
      }
    });
  }

  deleteAgent(agent: any) {
    this.backOfficeService.deleteAgent(agent.email).subscribe((res) => {
      this.valueService.agents.splice(
        this.valueService.agents.indexOf(agent),
        1
      );
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
