import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackOfficeService } from '../services/back-office.service';

@Component({
  selector: 'app-backoffice-settings',
  templateUrl: './backoffice-settings.component.html',
  styleUrls: ['./backoffice-settings.component.css'],
})
export class BackofficeSettingsComponent implements OnInit {
  email = 'office@gmail.com';
  settings = null;
  backOfficeDetails: any;
  constructor(
    private router: Router,
    private backOfficeService: BackOfficeService
  ) {}

  ngOnInit(): void {
    this.backOfficeService.getBackOffice(this.email).subscribe({
      next: (response: any) => {
        this.backOfficeDetails = response;
      },
      error: (response: any) => {
        console.log(response);
      },
    });
  }

  getImageUrl() {
    return `https://avatars.dicebear.com/api/adventurer/${this.backOfficeDetails?.firstName}.svg`;
  }

  saveSettings(settings: any) {
    this.backOfficeService.updateBackOffice(settings).subscribe({
      next: (response: any) => {
        console.log('****************');
        console.log(response);
      },
      error: (response: any) => {
        console.log('##############');
        console.log(response);
      },
    });
    // this.router.navigate(['backoffice']);
  }
  goBackToHome() {
    this.router.navigate(['backoffice']);
  }
}
