import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from '../services/agent.service';

@Component({
  selector: 'app-agent-client-profile',
  templateUrl: './agent-client-profile.component.html',
  styleUrls: ['./agent-client-profile.component.css']
})
export class AgentClientProfileComponent implements OnInit {

  clientDetails:any;
  id:any;  
  private sub: any;
  constructor(private agentService:AgentService,private router:Router, private activate:ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.activate.params.subscribe(params => {
      this.id = +params['id']; 
   });
   console.log(this.id);
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
  ngOnDestroy() {
    this.sub.unsubscribe();
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
        description: 'Transfert of 10 $ to souhail',
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
