import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BackOfficeService } from '../services/back-office.service';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css'],
})
export class AddAgentComponent implements OnInit {
  fileName = '';
  formData = new FormData();
  agent: any = {
    firstName: '',
    LastName: '',
    dateOfBirth: '',
    adress: '',
    email: '',
    phone: '',
    matricule: '',
    patente: '',
    description: '',
    file: this.formData,
  };
  constructor(
    public dialogAdd: MatDialogRef<AddAgentComponent>,
    private backOfficeService: BackOfficeService
  ) {}

  ngOnInit(): void {}

  OnCancel() {
    this.dialogAdd.close();
  }
  create() {
    console.log(this.agent);
    this.backOfficeService.createAgent(this.agent).subscribe(
      (res) => {
        console.log(res, 'res');
        this.dialogAdd.close();
      },
      (err) => {
        console.log(err);
      }
    );
    console.log('done');

    this.dialogAdd.close();
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      this.formData.append('fileID', file);
    }
  }
}
