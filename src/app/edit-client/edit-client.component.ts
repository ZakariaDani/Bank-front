import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public client: any, public dialogAdd: MatDialogRef<EditClientComponent>) {}

  ngOnInit(): void {
  }
  OnCancel() {
    this.dialogAdd.close();
  }
  save() {
    console.log(this.client.email);
    this.dialogAdd.close();
  }
}
