import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AgentService } from '../services/agent.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  options!: FormGroup;
  constructor(private fb: FormBuilder,
    private agentService:AgentService,
    public dialogAdd: MatDialogRef<AddClientComponent>) { }

  ngOnInit(): void {
    this.options = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern("^((\\+212-?)|0)?[0-9]{10}$")
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      address: new FormControl('', [
        Validators.required,
      ]),
      solde: new FormControl(0, [
      ]),
    });
  
  }
  OnCancel() {
    this.dialogAdd.close();
  }
  create() {
    if(this.options.valid){
      this.agentService.addClient(this.options.value)
    }
  }
}
