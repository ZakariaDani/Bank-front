import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackOfficeService } from '../services/back-office.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css'],
})
export class AgentsComponent implements OnInit {
  filteredAgents: any;
  @Input() agents: any;
  searchTerm = '';
  constructor(private backOfficeService: BackOfficeService) {}

  ngOnInit(): void {
    this.backOfficeService.getAllAgents().subscribe((agents) => {
      agents.forEach((agent: any) => {
        this.agents.push(agent);
      });
      
      console.log(this.filterAgents);
      
    });

    this.filteredAgents = this.agents;
  }

  showBookmarkedAgents() {
    this.filteredAgents = this.agents.filter((agent: any) => agent.isFavorite);
  }

  showAllAgents() {
    this.filteredAgents = this.agents;
  }

  showAgentsWithMostClients() {
    // this.filteredAgents = this.agents
    //   .sort((a, z) => z.agentsCount - a.agentsCount)
    //   .slice(0, 3);
  }

  showAgentsWithLeastClients() {
    // this.filteredAgents = this.agents
    //   .sort((a, z) => a.agentsCount - z.agentsCount)
    //   .slice(0, 3);
  }

  filterAgents() {
    if (this.searchTerm !== '') {
      this.filteredAgents = this.agents.filter((agent: any) =>
        agent.firstName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredAgents = this.agents;
    }
  }
}
