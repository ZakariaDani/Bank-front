import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-sign-in',
  templateUrl: './client-sign-in.component.html',
  styleUrls: ['./client-sign-in.component.css']
})
export class ClientSignInComponent implements OnInit {

  hide = true;

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.clientService.jwtUserToken.subscribe(token => {
      if(token) {
        this.router.navigateByUrl('/home_client').then();
      }
    });
  }
  toggleHide() {
    this.hide = !this.hide;
  }

  onSubmit(signinForm:NgForm){
    console.log(signinForm.value);
    if(signinForm.invalid){
      return;
    }
    const {username, password} = signinForm.value;
    this.clientService.login(username, password);
    return signinForm.reset();
  }
}
