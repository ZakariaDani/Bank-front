import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgentService } from '../services/agent.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  options!: FormGroup;
  constructor(private fb: FormBuilder,private agentService:AgentService,@Inject(MAT_DIALOG_DATA) public client: any, public dialogAdd: MatDialogRef<EditClientComponent>) {}

  ngOnInit(): void {
      this.options = new FormGroup({
        firstName: new FormControl(this.client.firstName, [
          Validators.required,
          Validators.minLength(3),
        ]),
        lastName: new FormControl(this.client.lastName, [
          Validators.required,
          Validators.minLength(3),
        ]),
        phone: new FormControl(this.client.phone, [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern("^((\\+212-?)|0)?[0-9]{10}$")
        ]),
        email: new FormControl(this.client.email, [
          Validators.required,
          Validators.email,
        ]),
        address: new FormControl(this.client.address, [
        ]),

        solde: new FormControl(this.client.solde, [
        ]),
      });
  }
  OnCancel() {
    this.dialogAdd.close();
  }
  update() {
    if(this.options.valid){
      this.agentService.updateClient(this.options.value,this.client.id)
      this.client.firstName = this.options.value.firstName;
      this.client.lastName = this.options.value.lastName;
      this.client.email = this.options.value.email;
      this.client.phone = this.options.value.phone;
      this.client.address = this.options.value.address;
      this.client.solde = this.options.value.solde;
      this.OnCancel();
    }
  }
}
