import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from '../services/agent.service';

@Component({
  selector: 'app-agent-settings',
  templateUrl: './agent-settings.component.html',
  styleUrls: ['./agent-settings.component.css']
})
export class AgentSettingsComponent implements OnInit {

  settings = null;
  sub:any;
  id:any;
  backOfficeDetails:any;
  image:any;
  
  constructor(private router: Router,private agentService:AgentService,private activate:ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.activate.params.subscribe(params => {
      this.id = +params['id']; 
   });
   console.log(this.id);
    this.agentService.getCurrentAgent().subscribe({
      next:(res:any)=>{
        this.backOfficeDetails = res;
        this.image="https://avatars.dicebear.com/api/adventurer/AymaneDaif.svg"
        console.log(this.backOfficeDetails)
      },
      error:(error)=>{
        console.log(error)
      }
    });
  }
  saveSettings(settings: any) {
    this.settings = settings;
    this.router.navigate(['agent']);
  }
  goBackToHome() {
    this.router.navigate(['agent']);
  }

}
