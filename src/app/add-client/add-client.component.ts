import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  firstName:any;
  LastName: any;
  dateOfBirth:any;
  adress:any;
  email:any;
  phone:any;
  matricule:any;
  patente:any;
  description:any;
  fileName = '';
  constructor(public dialogAdd: MatDialogRef<AddClientComponent>) { }

  ngOnInit(): void {
  }

  OnCancel() {
    this.dialogAdd.close();
  }
  create() {
    console.log(this.email);
    
    this.dialogAdd.close();
  }
  onFileSelected(event: any) {
    const file:File = event.target.files[0];

        if (file) {

            this.fileName = file.name;
            
        }
  }
}
