import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';


@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  public client:any;
  
  constructor(
    private router:Router,
    private clientService:ClientService) { }

  ngOnInit(): void {
    this.clientService.getClientInfo().subscribe(
      (response)=>{
        this.client=response;
        console.log(response);
      }
    )
  }
  goToHome(){
    this.router.navigate(["client-home"]);
  }


  panelOpenState = false;

}
