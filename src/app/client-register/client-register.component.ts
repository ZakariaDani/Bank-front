import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: [
    './client-register.component.css',
    '../sign-in/sign-in.component.css',
  ],
})
export class ClientRegisterComponent implements OnInit {
  hide = true;

  plafons = [200, 5000, 10000];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {}
  toggleHide() {
    this.hide = !this.hide;
  }
  onSubmit(registerForm: NgForm) {
    console.log(registerForm.value);
    if (registerForm.invalid) {
      return;
    }
    const { plafon, firstName, lastName, email, phone } = registerForm.value;
    this.clientService.register({ plafon, firstName, lastName, email, phone });
  }
}
