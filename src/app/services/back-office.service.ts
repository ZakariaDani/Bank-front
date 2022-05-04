import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable({
    providedIn: 'root',
  })
export class BackOfficeService {
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
        (res) => {
          this.toast
            .success('Login successful, Working on it...', '', {
              timeOut: 1000,
              positionClass: 'toast-top-center',
            })
            .onHidden.subscribe(() => {
              this.router.navigateByUrl('/backoffice').then();
            });
          console.log(res);
        },
        (err: any) => {
          this.toast.error('Login failed!', '', { timeOut: 1000,positionClass: 'toast-top-center', });
        }
      );
  }
}
