import { Component, OnInit } from '@angular/core';
import { AgentService } from '../services/agent.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  filteredclients: any;
  clients = [
    {
      id: 1,
      firstName: 'Zakaria',
      lastName: 'Dani',
      isFavorite: false,
    },
    {
      id: 2,
      firstName: 'Aymane',
      lastName: 'Daif',
      isFavorite: true,
    },
    {
      id: 3,
      firstName: 'Marouane',
      lastName: 'Zibout',
      isFavorite: true,
    },
    {
      id: 4,
      firstName: 'Souhail',
      lastName: 'Slaoui',
      isFavorite: true,
    },
    {
      id: 5,
      firstName: 'Bahomane',
      lastName: 'Yousef',
      isFavorite: true,
    },
    {
      id: 6,
      firstName: 'Abdelali',
      lastName: 'Hammadi',
      isFavorite: false,
    },
  ];
  searchTerm = '';
  constructor(private agentService:AgentService) {}

  ngOnInit(): void {
    this.filteredclients = this.clients;
    this.agentService.getAllClients().subscribe((clients) => {
      clients.forEach((client: any) => {
        this.clients.push(client);
      });
      console.log(this.clients);
    });
    this.filteredclients = this.clients;
  }

  showBookmarkedclients() {
    this.filteredclients = this.clients.filter((client) => client.isFavorite);
  }

  showAllclients() {
    this.filteredclients = this.clients;
  }

  filterclients() {
    if (this.searchTerm !== '') {
      this.filteredclients = this.clients.filter((client) =>
        client.firstName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredclients = this.clients;
    }
  }

}
