import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditAgentComponent } from '../edit-agent/edit-agent.component';
import { EditClientComponent } from '../edit-client/edit-client.component';
import { BackOfficeService } from '../services/back-office.service';

@Component({
  selector: 'app-single-client',
  templateUrl: './single-client.component.html',
  styleUrls: ['./single-client.component.css']
})
export class SingleClientComponent implements OnInit {

  @Input() client: any;

  constructor(
    private dialog: MatDialog,
    private backOfficeService: BackOfficeService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getImageUrl() {
    return `https://avatars.dicebear.com/api/adventurer/${this.client.firstName}.svg`;
  }

  goToProfilePage(id: string) {
    this.router.navigate(['agent', 'client', id]);
  }

  toggleFavorite(client: any) {
    client.isFavorite = !client.isFavorite;
    
  }
  openDialog() {
    const dialogAdd = this.dialog.open(EditClientComponent, {
      data: this.client,
      width: '50vw',
      hasBackdrop: true,
      role: 'dialog',
      height: '50vh',
    });
    dialogAdd.afterClosed().subscribe((data) => {
      this.backOfficeService
        .updateAgent(this.client.id, '')
        .subscribe((result: any) => {
          console.log(result);
        });
    });
  }
}
