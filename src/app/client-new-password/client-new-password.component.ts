import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-new-password',
  templateUrl: './client-new-password.component.html',
  styleUrls: ['./client-new-password.component.css']
})
export class ClientNewPasswordComponent implements OnInit {
  public hide = true;
  private token:any = "";
  constructor(
    private clientService:ClientService,
    private toast:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("act");
  }

  toggleHide(){
    this.hide = !this.hide;
  }

  onSubmit(newPasswordForm:NgForm){
    let data = newPasswordForm.value;
    this.clientService.setNewPasswordForTheClient(data).subscribe(
      (response)=>{
        localStorage.setItem("firstTime","false");
        this.toast.success(
          "The password has been changed successfully",
          "",
          {timeOut:1000}
        ).onHidden.subscribe(
          ()=>{
            this.router.navigate(["client-home"]);
          }
        );
      },
      (error)=>{
        this.toast.error(
          error.error.toString,
          "",
          {timeOut:2000}
        );
      }
    );
  }

}
