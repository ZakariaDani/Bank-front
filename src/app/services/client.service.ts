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

  register(client: any) {
    return this.http.post(`${this.CLIENT_URL}/register`, client).subscribe(
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
}
