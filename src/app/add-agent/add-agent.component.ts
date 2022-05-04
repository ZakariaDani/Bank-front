import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent implements OnInit {
  firstName:any;
  LastName: any;
  dateOfBirth:any;
  adress:any;
  email:any;
  phone:any;
  matricule:any;
  patente:any;
  description:any;
  file:any;
  constructor(public dialogAdd: MatDialogRef<AddAgentComponent>) { }

  ngOnInit(): void {
  }

  OnCancel() {
    this.dialogAdd.close();
  }
  create() {
    console.log(this.email);
    
    this.dialogAdd.close();
  }
}
