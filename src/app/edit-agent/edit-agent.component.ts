import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackOfficeService } from '../services/back-office.service';

@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html',
  styleUrls: ['./edit-agent.component.css'],
})
export class EditAgentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public agent: any, public dialogAdd: MatDialogRef<EditAgentComponent>, private backOfficeService: BackOfficeService) {}

  ngOnInit(): void {
  }

  OnCancel() {
    this.dialogAdd.close();
  }
  save() {  
    console.log(this.agent);
    
    this.backOfficeService
        .updateAgent(this.agent)
        .subscribe((result: any) => {
          console.log(result);
        });
    this.dialogAdd.close();
  }
}
