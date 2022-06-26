import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Agent } from '../models/agent.model';
@Injectable({
  providedIn: 'root',
})
export class BackOfficeService {
  private token = '';
  private jwtToken$ = new BehaviorSubject<string>(this.token);
  private BACK_OFFICE_URL = 'http://localhost:8081/api/v1/backoffice';
  constructor(private http: HttpClient, private toast: ToastrService) {
    const fetchedToken = localStorage.getItem('act');
    if (fetchedToken) {
      this.token = fetchedToken;
      console.log(this.token);
      this.jwtToken$.next(this.token);
    }
  }

  get jwtBackOfficeToken(): Observable<string> {
    return this.jwtToken$.asObservable();
  }

  getBackOffice(email: any): Observable<any> {
    return this.http.get(`${this.BACK_OFFICE_URL}/${email}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  updateBackOffice(backOffice: any) {
    return this.http
      .patch(`${this.BACK_OFFICE_URL}/${backOffice.email}`, backOffice, {
        headers: { Authorization: `Bearer ${this.token}` },
      })

      .pipe(
        tap((res) => {
          if (res) {
            this.toast.success('backoffice updated successfully', '', {
              timeOut: 1000,
            });
          }
        })
      );
  }

  getImage(imageName: string): Observable<any> {
    return this.http.get(`${this.BACK_OFFICE_URL}/agents/image/${imageName}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      responseType: 'blob',
    });
  }
  createAgentImage(agentId: string, file: File) {
    let formData = new FormData();
    formData.append('file', file, file.name);
    return this.http
      .post(`${this.BACK_OFFICE_URL}/agents/${agentId}/image`, formData, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        reportProgress: true,
        observe: 'response',
      })
      .subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (response: any) => {
          console.log(response);
        },
      });
  }
  createAgent(agent: any) {
    const {
      firstName,
      lastName,
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
      .post(
        `${this.BACK_OFFICE_URL}/agents`,
        {
          firstName,
          lastName,
          dateOfBirth,
          adress,
          email,
          phone,
          matricule,
          patente,
          description,

          password: agent.lastName + Math.floor(Math.random() * 1000),
          backofficeEmail: localStorage.getItem('backofficeEmail'),
        },
        {
          headers: { Authorization: `Bearer ${this.token}` },
        }
      )
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

  deleteAgent(agentEmail: string) {
    console.log(agentEmail, 'agentId');

    return this.http
      .delete(`${this.BACK_OFFICE_URL}/agents/${agentEmail}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .pipe(
        tap((res) => {
          console.log(res);
          if (res) {
            this.toast.success('Agent deleted...', '', {
              timeOut: 1000,
            });
          }
        })
      );
  }
  //You can add parameters that you want to update
  updateAgent(agent: Agent) {
    console.log(agent, agent.idCardNumber, '*******');

    return this.http

      .patch(`${this.BACK_OFFICE_URL}/agents/${agent.idCardNumber}`, agent, {
        headers: { Authorization: `Bearer ${this.token}` },
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

  getAllAgents(): Observable<any> {
    return this.http
      .get(`${this.BACK_OFFICE_URL}/agents`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .pipe(
        tap((res) => {
          if (res) {
            console.log(res);
          } else {
            console.log('not getted');
          }
        })
      );
  }

  addToFavourite(agent: any) {
    console.log(agent, agent.idCardNumber, '*******hnaaaaaa');

    return this.http
      .patch(
        `${this.BACK_OFFICE_URL}/agents/${agent.idCardNumber}/favorite`,
        { favorite: !agent.favorite },
        {
          headers: { Authorization: `Bearer ${this.token}` },
        }
      )
      .pipe(
        tap((res) => {
          console.log(res, 'hohohoho');

          if (res) {
            this.toast.success('agent updated successfully', '', {
              timeOut: 1000,
            });
          }
        })
      );
  }

  getFavoriteAgents(): Observable<any> {
    return this.http
      .get(`${this.BACK_OFFICE_URL}/agents/favorites`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .pipe(
        tap((res) => {
          if (res) {
            console.log(res);
          } else {
            console.log('not getted');
          }
        })
      );
  }

  getAgent(idCardNumber: any): Observable<any> {
    return this.http
      .get(`${this.BACK_OFFICE_URL}/agents/${idCardNumber}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .pipe(
        tap((res) => {
          if (res) {
            console.log(res);
          } else {
            console.log('not getted');
          }
        })
      );
  }
}
