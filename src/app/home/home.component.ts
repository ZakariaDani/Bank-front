import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAgentComponent } from '../add-agent/add-agent.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showFiller = false;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    const dialogAdd = this.dialog.open(AddAgentComponent, {
      width: '50vw',
      hasBackdrop: true,
      role: 'dialog',
      height: '60vh',
    });
  }
}
