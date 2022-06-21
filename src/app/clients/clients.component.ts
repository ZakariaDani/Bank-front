import { Component, OnInit } from '@angular/core';
import { AgentService } from '../services/agent.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  filteredclients: any;
  clients:any[] = [];
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
    if (this.searchTerm!=='') {
        this.filteredclients = this.clients.filter((client)=>
          client.firstName.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }else{
      this.filteredclients = this.clients;
    }
  }
}
