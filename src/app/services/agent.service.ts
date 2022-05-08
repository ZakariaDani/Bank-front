import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AgentService {
  private token = '';
  private jwtToken$ = new BehaviorSubject<string>(this.token);
  private AGENT_URL = 'http://localhost:8080/api/v1/Agent';
  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) {
    const fetchedToken = localStorage.getItem('bot');
    if (fetchedToken) {
      this.token = atob(fetchedToken);
      this.jwtToken$.next(this.token);
    }
  }

  get jwtBackOfficeToken(): Observable<string> {
    return this.jwtToken$.asObservable();
  }

  login(email: string, password: string) {
    this.http
      .post(`${this.AGENT_URL}/login`, { email, password })
      .subscribe(
        //@ts-ignore
        (res: { token: string }) => {
          this.token = res.token;
          if (this.token) {
            this.toast
              .success('Login successful, Working on it...', '', {
                timeOut: 1000,
                positionClass: 'toast-top-center',
              })
              .onHidden.subscribe(() => {
                this.jwtToken$.next(this.token);
                localStorage.setItem('bot', btoa(this.token));
                this.router.navigateByUrl('/backoffice').then();
              });
            console.log(res);
          }
        },
        (err: any) => {
          this.toast.error('Login failed!', '', {
            timeOut: 1000,
            positionClass: 'toast-top-center',
          });
        }
      );
  }

  createClient(client: any) {
    const {
      firstName,
      LastName,
      dateOfBirth,
      adress,
      email,
      phone,
    } = client;
    return this.http
      .post(`${this.AGENT_URL}/agents`, {
        firstName,
        LastName,
        dateOfBirth,
        adress,
        email,
        phone,
      })
      .pipe(
        tap((res) => {
          if (res) {
            this.toast.success('Agent created...', '', {
              timeOut: 1000,
            });
          }
        })
      );
  }

  deleteClient(clientId: number) {
    return this.http.delete(`${this.AGENT_URL}/clients/${clientId}`).pipe(
      tap((res) => {
        if (res) {
          this.toast.success('Agent deleted...', '', {
            timeOut: 1000,
          });
        }
      })
    );
  }
  //You can add parameters that you want to update
  updateClient(clientId: number, firstNameValue: string) {
    return this.http
      .patch(`${this.AGENT_URL}/clients/${clientId}`, {
        firstName: firstNameValue,
      })
      .pipe(
        tap((res) => {
          if (res) {
            this.toast.success('agent updated successfully', '', {
              timeOut: 1000,
            });
          }
        })
      );
  }

  logout() {
    this.token = '';
    this.jwtToken$.next(this.token);
    this.toast
      .success('logged out successfully', '', { timeOut: 700 })
      .onHidden.subscribe(() => {
        localStorage.removeItem('bot');
        this.router.navigateByUrl('/emp-signin').then();
      });
    return '';
  }
}