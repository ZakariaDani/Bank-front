import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  public firstName:String="";
  public lastName:String="";
  public email:String="";
  public phone:String="";
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToHome(){
    this.router.navigate(["client-home"]);
    console.log("aa")
  }
  save(){
    console.log()
  }
}
