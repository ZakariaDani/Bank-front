import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackOfficeService } from '../services/back-office.service';
import { SigninService } from '../services/signin.service';

@Component({
  selector: 'app-emp-sign-in',
  templateUrl: './emp-sign-in.component.html',
  styleUrls: ['./emp-sign-in.component.css'],
})
export class EmpSignInComponent implements OnInit {
  hide = true;
  constructor(private backOfficeService: BackOfficeService, private signinService: SigninService) {}

  ngOnInit(): void {}
  toggleHide() {
    this.hide = !this.hide;
  }
  signin(signinForm: NgForm) {
    if (signinForm.invalid) {
      return;
    }
    const { email, password } = signinForm.value;
    this.signinService.login(email, password);
    console.log(email, password);

    return signinForm.reset();
  }
}
