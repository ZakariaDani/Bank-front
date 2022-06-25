import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackOfficeService } from '../services/back-office.service';
import { ValueService } from '../services/value.service';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css'],
})
export class AddAgentComponent implements OnInit {
  formData = new FormData();
  agent: any = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    adress: '',
    email: '',
    phone: '',
    matricule: '',
    patente: '',
    description: '',
    fileName: '',
  };
  selectedFile: any = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public agents: any,
    public dialogAdd: MatDialogRef<AddAgentComponent>,
    private backOfficeService: BackOfficeService,
    public valueService: ValueService
  ) {}

  ngOnInit(): void {}

  OnCancel() {
    this.dialogAdd.close();
    console.log(this.valueService.agents);
  }

  create(addAgentForm: NgForm) {
    if (addAgentForm.valid) {
      console.log(this.agent);
      this.backOfficeService.createAgent(this.agent).subscribe(
        (res: any) => {
          this.valueService.agents.push(this.agent);

          this.backOfficeService.createAgentImage(
            res.idCardNumber,
            this.selectedFile
          );
        },
        (err) => {
          console.log(err);
        }
      );

      console.log('done');

      this.dialogAdd.close();
    }
  }
  onFileSelected(event: any) {
    if (event.target && event.target.files) {
      const file: File = event.target.files[0];
      this.agent.fileName = file.name;
      this.formData.append('fileID', file);
      console.log('db', file);
      this.selectedFile = file;
    }
  }
}
