import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-emp-sign-in',
  templateUrl: './emp-sign-in.component.html',
  styleUrls: ['./emp-sign-in.component.css'],
})
export class EmpSignInComponent implements OnInit {
  hide = true;
  constructor() {}

  ngOnInit(): void {}
  toggleHide() {
    this.hide = !this.hide;
  }
  signin(signinForm: NgForm) {
    if (signinForm.invalid) {
      return;
    }
    const { email, password } = signinForm.value;
    console.log(email, password);

    return signinForm.reset();
  }
}
