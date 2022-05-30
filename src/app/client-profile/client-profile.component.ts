import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AgentService } from '../services/agent.service';


@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  id=3;
  clientDetails:any;
  constructor(private agentService:AgentService,private router:Router) { }

  ngOnInit(): void {
    this.agentService.getClientById(this.id).subscribe({
      next:(res:any)=>{
        this.clientDetails = res;
        console.log(this.clientDetails)
      },
      error:(error)=>{
        console.log(error)
      }
    });
  }

  goToHome(){
    this.router.navigate(["client-home"]);
    console.log("aa")
  }
  save(){
    console.log()
  }

  panelOpenState = false;
  
  timeline= [
      {
        title: 'Transfert',
        description: 'Transfert of 10 $',
        date: '2019-12-12',
      },
      {
        title: 'Transfert',
        description: 'Transfert of 50 $',
        date: '2020-12-12',
      },
      {
        title: 'Deposite',
        description: 'You Have Deposite 100 $',
        date: '2020-05-04',
      },
    ]



}
