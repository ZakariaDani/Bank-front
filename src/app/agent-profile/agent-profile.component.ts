import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agent } from '../models/agent.model';
import { BackOfficeService } from '../services/back-office.service';

@Component({
  selector: 'app-agent-profile',
  templateUrl: './agent-profile.component.html',
  styleUrls: ['./agent-profile.component.css'],
})
export class AgentProfileComponent implements OnInit {
  panelOpenState = false;
  agent?: Agent;
  constructor(
    private backOfficeService: BackOfficeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.backOfficeService
      .getAgent(this.route.snapshot.paramMap.get('id'))
      .subscribe((agent) => {
        this.agent = agent;
      });
  }
}
