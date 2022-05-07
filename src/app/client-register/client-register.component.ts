import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css',"../client-sign-in/client-sign-in.component.css"]
})
export class ClientRegisterComponent implements OnInit {

  hide = true;

  types = [200,5000,10000]

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
