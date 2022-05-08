import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: [
    './client-register.component.css',
    '../client-sign-in/client-sign-in.component.css',
  ],
})
export class ClientRegisterComponent implements OnInit {
  hide = true;

  types = [200, 5000, 10000];

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
    const { acount_type, firstName, LastName, email, phone } = registerForm.value;
    this.clientService.register(registerForm.value);
    registerForm.reset();
  }
}
