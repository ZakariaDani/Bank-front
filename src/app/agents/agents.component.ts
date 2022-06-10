import { Component, OnInit } from '@angular/core';
import { BackOfficeService } from '../services/back-office.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css'],
})
export class AgentsComponent implements OnInit {
  agents: any = [];
  searchTerm = '';
 
  constructor(private backOfficeService: BackOfficeService) {}

  ngOnInit(): void {    
    this.backOfficeService.getAllAgents().subscribe((agents) => {
      agents.forEach((agent: any) => {
        this.agents.push(agent);
      });
      
    });
    
  }

  filterAgents() {
    if (this.searchTerm !== '') {
      this.agents = this.agents.filter((agent: any) =>
        agent.firstName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
