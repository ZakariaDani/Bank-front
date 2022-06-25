import { Component, OnInit } from '@angular/core';
import { ValueService } from '../services/value.service';

@Component({
  selector: 'app-agents-least-clients',
  templateUrl: './agents-least-clients.component.html',
  styleUrls: ['./agents-least-clients.component.css'],
})
export class AgentsLeastClientsComponent implements OnInit {
  constructor(private valueService: ValueService) {}
  agentsWithLeastClients: any = [];
  ngOnInit(): void {
    this.agentsWithLeastClients = this.valueService.agents
      .sort((a: any, z: any) => a.number_of_client - z.number_of_client)
      .slice(0, 3);
  }
}
