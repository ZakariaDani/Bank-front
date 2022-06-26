import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { SigninService } from '../services/signin.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css'],
})
export class ClientHomeComponent implements OnInit {

  public the_client_tries_to_connect_for_the_first_time = true;

  public client:any;

  constructor(
    private router: Router,
    private signInService: SigninService,
    private titleService: Title,
    private clientService:ClientService
  ) {
    this.titleService.setTitle('Client');
  }

  ngOnInit(): void {
    this.getMyInfo();    
  }

  goToHome() {
    this.router.navigate(['client-home']);
  }
  goToProfile() {
    this.router.navigate(['client-home/profile']);
  }
  goToHistory() {
    this.router.navigate(['client-home/history']);
  }
  logout() {
    this.signInService.logout();
  }

  getMyInfo(){
    this.clientService.getMyInfo().subscribe(
      (response:any)=>{
        this.client = response;
      }
      ,
      (error:any)=>{
        console.log(error);
      }
    );
  }
}
