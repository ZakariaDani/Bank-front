import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-client-sign-in',
  templateUrl: './client-sign-in.component.html',
  styleUrls: ['./client-sign-in.component.css']
})
export class ClientSignInComponent implements OnInit {

  hide = true;

  constructor() { }

  ngOnInit(): void {
  }
  toggleHide() {
    this.hide = !this.hide;
  }

  onSubmit(signinForm:NgForm){
    console.log(signinForm.value);
  }
}
