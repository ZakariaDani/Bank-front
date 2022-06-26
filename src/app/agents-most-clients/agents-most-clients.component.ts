import { Component, OnInit } from '@angular/core';
import { ValueService } from '../services/value.service';

@Component({
  selector: 'app-agents-most-clients',
  templateUrl: './agents-most-clients.component.html',
  styleUrls: ['./agents-most-clients.component.css'],
})
export class AgentsMostClientsComponent implements OnInit {
  constructor(private valueService: ValueService) {}
  agentsWithMostClients: any = [];
  ngOnInit(): void {
    this.agentsWithMostClients = this.valueService.agents
      .sort((a: any, z: any) => z.number_of_client - a.number_of_client)
      .slice(0, 3);
  }
}
