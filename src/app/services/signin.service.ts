import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  roleAs: any;
  isLogin = false;
  private token = '';
  private jwtToken$ = new BehaviorSubject<string>(this.token);
  private AUTH_URL = 'http://localhost:8081/login';
  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService,
    private clientService:ClientService
  ) {
    const fetchedToken = localStorage.getItem('act');
    if (fetchedToken) {
      this.token = fetchedToken;
      this.jwtToken$.next(this.token);
    }
  }

  get jwtUserToken(): Observable<string> {
    return this.jwtToken$.asObservable();
  }

  login(identifiant: string, password: string) {
    this.http
      .post(`${this.AUTH_URL}`, { identifiant, password })
      .subscribe(
        //@ts-ignore
        (res: { 'refresh-token': string,'access-token': string }) => {
          this.token = res['access-token'];
          if (this.token) {
            this.toast
              .success('Login successful, Working on it...', '', {
                timeOut: 700,
                positionClass: 'toast-top-center',
              })
              .onHidden.subscribe(() => { 
                this.jwtToken$.next(this.token);
                const decryptedResponse: any = jwt_decode(res['access-token']);
                localStorage.setItem('act', this.token);
                localStorage.setItem('ROLE', decryptedResponse.roles[0]);
                
                localStorage.setItem('STATE', 'true');

                if (decryptedResponse.roles[0] === 'ROLE_AGENT') {
                  this.router.navigateByUrl('/agent').then();
                  localStorage.setItem('agentEmail', decryptedResponse.sub);
                }
                if (decryptedResponse.roles[0] === 'ROLE_BACKOFFICE') {
                  this.router.navigateByUrl('/backoffice').then();
                  localStorage.setItem('backofficeEmail', decryptedResponse.sub);
                }
                if (decryptedResponse.roles[0] === 'ROLE_CLIENT') {
                  this.clientService.checkIfTheClientIsConnectedForTheFirstTime(this.token)
                  .subscribe(
                    (response:any)=>{
                      let the_client_tried_to_connect_for_the_first_time = response;
                      console.log(response);
                      localStorage.setItem("firstTime",
                      the_client_tried_to_connect_for_the_first_time)

                      if(the_client_tried_to_connect_for_the_first_time){
                        this.router.navigateByUrl("/newPassword").then();
                      }
                      else{
                        this.router.navigateByUrl('/client-home').then();
                      }
                    },
                    (error)=>{
                      console.log(error);
                    }
                  )
                }
              });
          }
        },
        (error) => {
          this.toast.error('Authentification failed!', '', { timeOut: 2000 });
        }
      );
  }

  logout() {
    this.token = '';
    this.jwtToken$.next(this.token);
    this.toast
      .success('logged out successfully', '', { timeOut: 700 })
      .onHidden.subscribe(() => {
        localStorage.removeItem('act');
        localStorage.removeItem('ROLE');
        localStorage.removeItem('backofficeEmail');
        localStorage.removeItem('firstTime');
        localStorage.setItem('STATE', 'false');
        this.router.navigateByUrl('/').then();
      });
    return '';
  }

  getRole() {
    this.roleAs = localStorage.getItem('ROLE');
    return this.roleAs;
  }
}
