import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {Client} from "../models/client";

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private token = '';
  private jwtToken$ = new BehaviorSubject<string>(this.token);

  private CLIENT_URL = 'http://localhost:8081/api/v1/client';
  private client:any ={};
  private transactionId = 0;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) {
    const fetchedToken = localStorage.getItem('act');
    if (fetchedToken) {
      this.token = atob(fetchedToken);
      this.jwtToken$.next(this.token);
    }
  }

  get jwtUserToken(): Observable<string> {
    return this.jwtToken$.asObservable();
  }

  register(client: any) {
    return this.http
      .post(`${this.CLIENT_URL}/register`, client)
      .subscribe(
        () => {
          this.toast
            .success('Register successful, please logIn...', '', {
              timeOut: 700,
              positionClass: 'toast-top-center',
            })
            .onHidden.subscribe(() => {
              this.router.navigateByUrl('/client-signin').then();
            });
        }
        ,
        () => {
          this.toast.error('Client already exists !', '', { timeOut: 1000 });
        }
      );
  }

  logout() {
    this.token = '';
    this.jwtToken$.next(this.token);
    this.toast
      .success('logged out successfully', '', { timeOut: 500 })
      .onHidden.subscribe(() => {
        localStorage.removeItem('act');
        this.router.navigateByUrl('/home_client').then();
      });
    return '';
  }

  getClientInfo():Observable<Client>{
    return this.http.get<Client>(`${this.CLIENT_URL}/getInfo`,
                {
                  headers:{"Authorization":`Bearer ${this.token}`}
    } )
  }

  showVerficationContainer(){
    let verificationContainer = document.getElementById("verificationContainer");
    verificationContainer?.classList.remove("opacity-translate");

  }

  hideVerificationContainer(){
    let verificationContainer = document.getElementById("verificationContainer");
    verificationContainer?.classList.add("opacity-translate");
  }

  validateTransactionForm(phone:any,amount:any){
    console.log("phone:"+phone);
    if(new RegExp("^0[5-7][0-9]+$").test(phone)  == false){
      this.toast
      .error('Invalid phone number', '', { timeOut: 2000 })
      return false;
    }
    if(new RegExp("^[0-9]+$").test(amount) == false){
      this.toast
      .error('The amount must be a type number', '', { timeOut: 2000 })
      return false;
    }
    return true;
  }

  makeTransaction(transactionForm:NgForm){
    if(transactionForm.invalid){
      return
    }
    const {receiverPhone ,amount } = transactionForm.value;
    const validTransaction:boolean = this.validateTransactionForm(receiverPhone,amount);

    if(validTransaction){
      this.http.post(`${this.CLIENT_URL}/make_transaction`,
      {receiverPhone,amount},{
          headers:{"Authorization":`Bearer ${this.token}`}
      }).subscribe(
        (response:any)=>{
          this.transactionId = response;
          this.showVerficationContainer();
        },
        (error:any)=>{
          this.toast.error(error.error.message.toString(),"",{timeOut:2000});
        }
      );
    }
  }

  makeRechargeTelecom(rechargeForm:NgForm, telecomEntreprise:string){
    if(rechargeForm.invalid){
      return
    }
    const {receiverPhone ,amount } = rechargeForm.value;
    console.log({receiverPhone,amount});

    const validatTransaction:boolean = this.validateTransactionForm(receiverPhone,amount);

    if(validatTransaction){
      this.http.post(`${this.CLIENT_URL}/make_telecom_recharge`,
      {telecomEntreprise,receiverPhone,amount},{
          headers:{"Authorization":`Bearer ${this.token}`}
      }).subscribe(
        (response:any)=>{
          this.transactionId = response;
          this.showVerficationContainer();
        },
        (error)=>{
          this.toast.error(error.error.message.toString(),"",{timeOut:2000});
        }
      );
    }
  }

  sendVerificationCode(code:any){
    if(new RegExp("^[0-9]+").test(code) == false){
      this.toast.error(
        "Invalid verification code",
        "",
        {timeOut:2000}
      );
      return
    }

    let transactionId:string = "" +this.transactionId;

    this.http.post(
      `${this.CLIENT_URL}/verification_code`,
      {code},
      {
        headers:
          {
            "Authorization":`Bearer ${this.token}`,
            "transactionId":transactionId
          }
      }
    ).subscribe(
      (response)=>{
          this.toast.success(
            "The transaction has been successfully",
            "",
            {timeOut:2000}
          ).onHidden.subscribe(
            ()=>{
              this.hideVerificationContainer();
              this.router.navigate(["client-home/history"])
            }
          )
      },
      (error)=>{
        this.toast.error(
          error.error.message.toString(),
          "",
          {timeOut:2000}
        );
      }
    );
  }

  getAllTransactions(){

    return this.http.get(`${this.CLIENT_URL}/getTransactions`,
      {headers:{"Authorization":`Bearer ${this.token}`}}
      );
  }
}
