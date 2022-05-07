import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html',
  styleUrls: ['./edit-agent.component.css'],
})
export class EditAgentComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public agent: any, public dialogAdd: MatDialogRef<EditAgentComponent>) {}

  ngOnInit(): void {
  }

  OnCancel() {
    this.dialogAdd.close();
  }
  save() {
    console.log(this.agent.email);

    this.dialogAdd.close();
  }
}
