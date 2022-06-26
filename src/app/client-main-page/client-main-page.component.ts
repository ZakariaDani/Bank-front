import { HttpClient } from '@angular/common/http';
import { ASTWithSource } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-main-page',
  templateUrl: './client-main-page.component.html',
  styleUrls: ['./client-main-page.component.css']
})
export class ClientMainPageComponent implements OnInit {

  public telecom_entreprises = ["maroc_telecom","orange","inwi"]
  public selected_entreprise = "maroc_telecom";
  public recharge_amounts = [5,10,20,50,100,200];
  public verificationCode = "";
  public nbr_of_attempts:number = 0;
  public nbr_seconds_for_attempts:number = 30;
  public client:any;

  constructor(private clientService:ClientService,
              private router:Router) { }


  ngOnInit(): void {
    this.nbr_of_attempts = this.clientService.getAttemptsNumber();
  }

  next(entreprise:string){
    this.selected_entreprise = entreprise;
    let first_page = document.getElementById("first_page_recharge");
    let next_page = document.getElementById("next_page_recharge");
    first_page?.classList.add("to_the_left");
    next_page?.classList.remove("to_the_right");
    let return_icon = document.getElementById("return_icon")
    return_icon?.classList.remove("d-none");
  }

  return(target:any){
    let first_page = document.getElementById("first_page_recharge");
    let next_page = document.getElementById("next_page_recharge");
    first_page?.classList.remove("to_the_left");
    next_page?.classList.add("to_the_right");
    target.classList.add("d-none");
  }

  hideVerificationContainer(){
    this.clientService.hideVerificationContainer();
  }
  
  showVerificationContainer(){
    this.clientService.showVerficationContainer();
  }

  makeTransaction(transactionForm:NgForm){
    this.clientService.makeTransaction(transactionForm);
  }

  makeRechargeTelecom(rechargeForm:NgForm){
    this.clientService.makeRechargeTelecom(rechargeForm, this.selected_entreprise);
  }
 
  sendVerificationCode(){
    if(this.nbr_of_attempts <4){
      this.clientService.sendVerificationCode(this.verificationCode);
      this.verificationCode = "";
      this.nbr_of_attempts = this.clientService.getAttemptsNumber();
      if(this.nbr_of_attempts == 4){
        var interval = setInterval(()=>{ 
          if (this.nbr_seconds_for_attempts >=1) { 
            this.nbr_seconds_for_attempts -= 1;
          }
          else { 
            this.nbr_of_attempts = 0;
            this.nbr_seconds_for_attempts = 30
            this.clientService.setAttemptsNumber(0);
            clearInterval(interval);    
          }
       }, 1000);
      }
    }
  }

  
  

  

  
}
