import { Component, OnInit } from '@angular/core';
import { BackOfficeService } from '../services/back-office.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css'],
})
export class AgentsComponent implements OnInit {
  filteredAgents: any;
  agents = [
    {
      id: 1,
      firstName: 'Zakaria',
      lastName: 'Dani',
      isFavorite: true,
      agentsCount: 2,
    },
    {
      id: 2,
      firstName: 'Aymane',
      lastName: 'Daif',
      isFavorite: true,
      agentsCount: 6,
    },
    {
      id: 3,
      firstName: 'Marouane',
      lastName: 'Zibout',
      isFavorite: true,
      agentsCount: 15,
    },
    {
      id: 4,
      firstName: 'Souhail',
      lastName: 'Slaoui',
      isFavorite: true,
      agentsCount: 10,
    },
    {
      id: 5,
      firstName: 'Bahomane',
      lastName: 'Yousef',
      isFavorite: true,
      agentsCount: 1,
    },
    {
      id: 6,
      firstName: 'Abdelali',
      lastName: 'Hammadi',
      isFavorite: true,
      agentsCount: 5,
    },
    {
      id: 7,
      firstName: 'Abdelhakim',
      lastName: 'Benkirane',
      isFavorite: false,
      agentsCount: 3,
    },
  ];
  searchTerm = '';
  constructor(private backOfficeService: BackOfficeService) {}

  ngOnInit(): void {
    console.log(this.backOfficeService.getAllAgents());
    
    this.filteredAgents = this.agents;
  }

  showBookmarkedAgents() {
    this.filteredAgents = this.agents.filter((agent) => agent.isFavorite);
  }

  showAllAgents() {
    this.filteredAgents = this.agents;
  }

  showAgentsWithMostClients() {
    this.filteredAgents = this.agents
      .sort((a, z) => z.agentsCount - a.agentsCount)
      .slice(0, 3);
  }

  showAgentsWithLeastClients() {
    this.filteredAgents = this.agents
      .sort((a, z) => a.agentsCount - z.agentsCount)
      .slice(0, 3);
  }

  filterAgents() {
    if (this.searchTerm !== '') {
      this.filteredAgents = this.agents.filter((agent) =>
        agent.firstName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredAgents = this.agents;
    }
  }
}
