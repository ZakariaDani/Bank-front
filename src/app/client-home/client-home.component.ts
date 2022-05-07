import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToHome(){
    this.router.navigate(["client-home"])
  }
  goToProfile(){
    this.router.navigate(["client-home/profile"]);
  }
  goToHistory(){
    this.router.navigate(["client-home/history"]);
  }
  logout(){
    this.router.navigate(["client-signin"])
  }
}
