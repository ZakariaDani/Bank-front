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

  createClient(client: any) {
    const { firstName, LastName, dateOfBirth, adress, email, phone } = client;
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
    return this.http.patch(`${this.AGENT_URL}/clients/${clientId}`, {
      firstName: firstNameValue,
    });
  }
}
