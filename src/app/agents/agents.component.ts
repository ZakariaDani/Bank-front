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
      name: 'Aymane Daif',
    },
    {
      id: 2,
      name: 'Zakaria Dani',
    },
    {
      id: 3,
      name: 'Marouane Zibout',
    },
    {
      id: 4,
      name: 'Souhail Slaoui',
    },
    {
      id: 5,
      name: 'Bahomane Yousef',
    },
    {
      id: 6,
      name: 'Abdelali Hammadi',
    },
    {
      id: 7,
      name: 'Abdelhakim Benkirane',
    },
    {
      id: 8,
      name: 'Abdelhakim Benkirane',
    },
    {
      id: 9,
      name: 'Abdelhakim Benkirane',
    },
    {
      id: 10,
      name: 'Abdelhakim Benkirane',
    },
    {
      id: 11,
      name: 'Abdelhakim Benkirane',
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
        agent.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredAgents = this.agents;
    }
  }
}
