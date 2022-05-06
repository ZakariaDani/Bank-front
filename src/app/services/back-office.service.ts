import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BackOfficeService {
  private token = '';
  private jwtToken$ = new BehaviorSubject<string>(this.token);
  private BACK_OFFICE_URL = 'http://localhost:3000/api/v1/backoffice';
  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) {}

  login(email: string, password: string) {
    this.http
      .post(`${this.BACK_OFFICE_URL}/login`, { email, password })
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

  createAgent(agent: any) {
    const {
      firstName,
      LastName,
      dateOfBirth,
      adress,
      email,
      phone,
      matricule,
      patente,
      description,
      file,
    } = agent;
    return this.http
      .post(`${this.BACK_OFFICE_URL}/agents`, {
        firstName,
        LastName,
        dateOfBirth,
        adress,
        email,
        phone,
        matricule,
        patente,
        description,
        file,
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

  deleteAgent(agentId: number) {
    return this.http.delete(`${this.BACK_OFFICE_URL}/agents/${agentId}`).pipe(
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
  updateAgent(agentId: number, firstNameValue: string) {
    return this.http
      .patch(`${this.BACK_OFFICE_URL}/agents/${agentId}`, {
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
