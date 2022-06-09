import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackOfficeService } from '../services/back-office.service';

@Component({
  selector: 'app-agent-profile',
  templateUrl: './agent-profile.component.html',
  styleUrls: ['./agent-profile.component.css'],
})
export class AgentProfileComponent implements OnInit {
  panelOpenState = false;
  agent: any = {
    adress: '',
    backOffice: { backId: null, email: '' },
    dateOfBirth: null,
    description: '',
    email: '',
    favorite: null,
    file: '',
    firstName: '',
    idCardNumber: null,
    lastName: '',
    matricule: '',
    patente: '',
    phone: '',
  };
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
