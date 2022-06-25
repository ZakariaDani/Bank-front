import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SigninService } from '../services/signin.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css'],
})
export class ClientHomeComponent implements OnInit {
  constructor(
    private router: Router,
    private signInService: SigninService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Client');
  }

  ngOnInit(): void {}

  goToHome() {
    this.router.navigate(['client-home']);
  }
  goToProfile() {
    this.router.navigate(['client-home/profile']);
  }
  goToHistory() {
    this.router.navigate(['client-home/history']);
  }
  logout() {
    this.signInService.logout();
  }
}
