import { Component, OnInit } from '@angular/core';

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
      lastName: 'Dani'
    },
    {
      id: 2,
      firstName: 'Aymane',
      lastName: 'Daif'
    },
    {
      id: 3,
      firstName: 'Marouane',
      lastName: 'Zibout'
    },
    {
      id: 4,
      firstName: 'Souhail',
      lastName: 'Slaoui'
    },
    {
      id: 5,
      firstName: 'Bahomane',
      lastName: 'Yousef'
    },
    {
      id: 6,
      firstName: 'Abdelali',
      lastName: 'Hammadi'
    },
    {
      id: 7,
      firstName: 'Abdelhakim',
      lastName: 'Benkirane'
    },
  ];
  searchTerm = '';
  constructor() {}

  ngOnInit(): void {
    this.filteredAgents = this.agents;
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
