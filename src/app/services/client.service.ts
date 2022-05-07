import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private token = '';
  private jwtToken$ = new BehaviorSubject<string>(this.token);
  private CLIENT_URL = 'http://localhost:8080/api/v1/client';
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

  login(phone: string, password: string) {
    this.http
      .post(`${this.CLIENT_URL}/login`, { phone, password })

      .subscribe(
        //@ts-ignore
        (res: { token: string }) => {
          this.token = res.token;
          if (this.token) {
            this.toast
              .success('Login successful, Working on it...', '', {
                timeOut: 700,
                positionClass: 'toast-top-center',
              })
              .onHidden.subscribe(() => {
                this.jwtToken$.next(this.token);
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
        },
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

}