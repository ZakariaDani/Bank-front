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
        (res: { "refresh-token": string, "acces-tocken": string }) => {
          this.token = res['acces-tocken'];
          jwt_decode(res['acces-tocken'])
          if (this.token) {
            this.toast
              .success('Login successful, Working on it...', '', {
                timeOut: 700,
                positionClass: 'toast-top-center',
              })
              .onHidden.subscribe(() => {
                this.jwtToken$.next(this.token);
                console.log(this.token);
                
                localStorage.setItem('act', btoa(this.token));
                this.router.navigateByUrl('/home_client').then();
              });
          }
        },
        (err: HttpErrorResponse) => {
          this.toast.error('Authentification failed!', '', { timeOut: 1000 });
        }
      );
  }
}