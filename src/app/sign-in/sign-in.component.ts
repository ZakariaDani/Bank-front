import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SigninService } from '../services/signin.service';

@Component({
  selector: 'app-client-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  hide = true;
  public IS_A_NUMBER = new RegExp("^[0-9]+");

  constructor(
    private signinService: SigninService,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('Welcome');
  }

  ngOnInit(): void {}
  toggleHide() {
    this.hide = !this.hide;
  }

  onSubmit(signinForm: NgForm) {
    
    if (signinForm.invalid) {
      return;
    }
    
    const { identifiant, password } = signinForm.value;
  
    this.signinService.login(identifiant, password);

    return signinForm.reset();

  }
}
