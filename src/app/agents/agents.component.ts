import { Component, OnInit } from '@angular/core';
import { BackOfficeService } from '../services/back-office.service';
import { ValueService } from '../services/value.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css'],
})
export class AgentsComponent implements OnInit {
  searchTerm = '';
  filteredAgents = [];

  constructor(
    private backOfficeService: BackOfficeService,
    public valueService: ValueService
  ) {}

  ngOnInit(): void {
    this.backOfficeService.getAllAgents().subscribe((agents) => {
      this.valueService.agents = agents;

      this.valueService.bookmarked = agents;
    });
  }

  filterAgents() {
    if (this.searchTerm !== '') {
      this.valueService.bookmarked = this.valueService.agents.filter(
        (agent: any) =>
          agent.firstName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.valueService.bookmarked = this.valueService.agents;
    }
  }
  showAgentsWithMostClients() {
    this.valueService.agents = this.valueService.agents
      .sort((a: any, z: any) => z.agentsCount - a.agentsCount)
      .slice(0, 3);
  }
  showAgentsWithLeastClients() {
    this.valueService.agents = this.valueService.agents
      .sort((a: any, z: any) => a.agentsCount - z.agentsCount)
      .slice(0, 3);
  }
}
