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

  constructor(
    private backOfficeService: BackOfficeService,
    public valueService: ValueService
  ) {}

  ngOnInit(): void {
    this.backOfficeService.getAllAgents().subscribe((agents) => {
      this.valueService._agents = agents;
    });
  }

  filterAgents() {
    if (this.searchTerm !== '') {
      this.valueService._agents = this.valueService._agents.filter(
        (agent: any) =>
          agent.firstName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
