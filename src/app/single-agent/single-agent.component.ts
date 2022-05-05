import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditAgentComponent } from '../edit-agent/edit-agent.component';
import { BackOfficeService } from '../services/back-office.service';

@Component({
  selector: 'app-single-agent',
  templateUrl: './single-agent.component.html',
  styleUrls: ['./single-agent.component.css'],
})
export class SingleAgentComponent implements OnInit {
  @Input() agent: any;

  constructor(
    private dialog: MatDialog,
    private backOfficeService: BackOfficeService
  ) {}

  ngOnInit(): void {}

  getImageUrl() {
    return `https://avatars.dicebear.com/api/adventurer/${this.agent.firstName}.svg`;
  }

  openDialog() {
    const dialogAdd = this.dialog.open(EditAgentComponent, {
      data: this.agent,
      width: '50vw',
      hasBackdrop: true,
      role: 'dialog',
      height: '50vh',
    });
    dialogAdd.afterClosed().subscribe((data) => {
      this.backOfficeService.updateAgent(this.agent.id, '').subscribe((result: any) => {
        console.log(result);
      });
    });
  }
}
