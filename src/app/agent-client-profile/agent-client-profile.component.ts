import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from '../services/agent.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-agent-client-profile',
  templateUrl: './agent-client-profile.component.html',
  styleUrls: ['./agent-client-profile.component.css']
})
export class AgentClientProfileComponent implements OnInit {

  clientDetails:any;
  id:any;  
  private sub: any;
  public clientTransactions :any;

  constructor(private agentService:AgentService,
    private router:Router, 
    private activate:ActivatedRoute,
    private clientService:ClientService) { }

  ngOnInit(): void {
    this.sub = this.activate.params.subscribe(params => {
      this.id = +params['id']; 
   });
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




}
