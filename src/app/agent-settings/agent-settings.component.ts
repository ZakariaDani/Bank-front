import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-settings',
  templateUrl: './agent-settings.component.html',
  styleUrls: ['./agent-settings.component.css']
})
export class AgentSettingsComponent implements OnInit {

  settings = null;
  backOfficeDetails = this.settings || {
    firstName: 'Mostapha',
    lastName: 'HAD HI AGENT MESKIN',
    email: 'hamid@gmail.com',
    phone: '+923001234567',
    image: 'https://avatars.dicebear.com/api/bottts/backoffice.svg',
    joinDate: '2017-12-12',
  };
  constructor(private router: Router) {}

  ngOnInit(): void {}
  saveSettings(settings: any) {
    this.settings = settings;
    this.router.navigate(['agent']);
  }
  goBackToHome() {
    this.router.navigate(['agent']);
  }

}
