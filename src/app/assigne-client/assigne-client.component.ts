import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AgentService } from '../services/agent.service';

@Component({
  selector: 'app-assigne-client',
  templateUrl: './assigne-client.component.html',
  styleUrls: ['./assigne-client.component.css']
})
export class AssigneClientComponent implements OnInit {

  clients:any[]=[];
  obj:any;
  show:boolean=true;
  constructor(private agentService:AgentService,public dialogAdd: MatDialogRef<AssigneClientComponent>) { }
  ngOnInit(): void {
    this.agentService.getClientsWithoutAgent().subscribe({
      next:(msg)=>{
        this.clients = msg;
        if(msg.length>0){
          this.show = false;
        }
      },
      error:(error)=>{
        console.log(error)
      }
    });
  }
  OnCancel(){
    this.dialogAdd.close();
  }
  onAccept(client:any){
    this.obj = {clientId:`${client.id}`,agentEmail:`${this.agentService.currentmail}`}
    console.log(this.obj);
    try{
      this.agentService.assigneClient(this.obj).subscribe((resp)=>{
        alert(resp)
        let index = this.clients.indexOf(client)
        this.clients.splice(index,1);
        if(this.clients.length<=0){
            this.show = true
        }
        window.location.reload();
    })
    }catch(err){
      alert(err)
    }
  }
  onReject(client:any){
    try{
      this.agentService.deleteClient(client.id).subscribe((resp)=>{
        alert(resp);
        let index = this.clients.indexOf(client)
        this.clients.splice(index,1);
        if(this.clients.length<=0){
          this.show = true
        }
      })
    }catch(err){
      alert(err);
    }
  }
}
