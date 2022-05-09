import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  roleAs: any;
  isLogin = false;
  private token = '';
  private jwtToken$ = new BehaviorSubject<string>(this.token);
  private CLIENT_URL = 'http://localhost:8080/login';
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

  login(identifiant: string, password: string) {
    this.http
      .post(`${this.CLIENT_URL}`, { email: identifiant, password })

      .subscribe(
        //@ts-ignore
        (res: { 'refresh-token': string; 'acces-tocken': string }) => {
          this.token = res['acces-tocken'];
          if (this.token) {
            this.toast
              .success('Login successful, Working on it...', '', {
                timeOut: 700,
                positionClass: 'toast-top-center',
              })
              .onHidden.subscribe(() => {
                this.jwtToken$.next(this.token);
                const decryptedResponse: any = jwt_decode(res['acces-tocken']);
                console.log(decryptedResponse.roles[0]);
                localStorage.setItem('act', btoa(this.token));
                localStorage.setItem('ROLE', decryptedResponse.roles[0]);
                localStorage.setItem('STATE', 'true');
                if (decryptedResponse.roles[0] === 'ROLE_AGENT') {
                  this.router.navigateByUrl('/agent').then();
                }
                if (decryptedResponse.roles[0] === 'ROLE_BACKOFFICE') {
                  this.router.navigateByUrl('/backoffice').then();
                }
              });
          }
        },
        (err: HttpErrorResponse) => {
          this.toast.error('Authentification failed!', '', { timeOut: 1000 });
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
        localStorage.setItem('STATE', 'false');
        this.router.navigateByUrl('/emp-signin').then();
      });
    return '';
  }


  isLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn == 'true')
      this.isLogin = true;
    else
      this.isLogin = false;
    return this.isLogin;
  }


  getRole() {
    this.roleAs = localStorage.getItem('ROLE');
    return this.roleAs;
  }
}
