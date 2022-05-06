import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-backoffice-settings',
  templateUrl: './backoffice-settings.component.html',
  styleUrls: ['./backoffice-settings.component.css'],
})
export class BackofficeSettingsComponent implements OnInit {
  settings = null;
  backOfficeDetails = this.settings || {
    firstName: 'Hamid',
    lastName: 'Mol chi',
    email: 'hamid@gmail.com',
    phone: '+923001234567',
    image: 'https://avatars.dicebear.com/api/bottts/backoffice.svg',
    joinDate: '2017-12-12',
  };
  constructor(private router: Router) {}

  ngOnInit(): void {}
  saveSettings(settings: any) {
    this.settings = settings;
    this.router.navigate(['backoffice']);
  }
  goBackToHome() {
    this.router.navigate(['backoffice']);
  }
}
