import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ClientRegisterComponent } from '../client-register/client-register.component';
@Injectable({
  providedIn: 'root',
})
export class AgentService {
  private token = '';
  private jwtToken$ = new BehaviorSubject<string>(this.token);
  private AGENT_URL = 'http://localhost:8080/api/v1/agent';
  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) {
    const fetchedToken = localStorage.getItem('act');
    if (fetchedToken) {
      this.token = fetchedToken
      this.jwtToken$.next(this.token);
    }
  }

  get jwtBackOfficeToken(): Observable<string> {
    return this.jwtToken$.asObservable();
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
  getAllClients(): Observable<any> {
    return this.http
      .get(`${this.AGENT_URL}/clients`, {
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
  toggleFav(id: number){
    console.log(this.token)
    console.log('****************************');
    
    console.log(`${this.AGENT_URL}/toggleFav/${id}`);
    
    return this.http
      .post(
        `${this.AGENT_URL}/toggleFav/${id}`,
        {
          headers: { Authorization: `Bearer ${this.token}` },
        }
      )
      .subscribe({
        next:(resp)=>{
          console.log(resp)
        },
        error:(err)=>{
          console.log(err)
        }
      })
  }

  addClient(client: any){
    return this.http
      .post(
        `${this.AGENT_URL}/addclient/`,client,
        {
          headers: { Authorization: `Bearer ${this.token}` },
        }
      )
      .subscribe({
        next:(resp)=>{
          console.log(resp)
        },
        error:(err)=>{
          console.log(err)
        }
      })
  }

  getClientById(id: any){
    return this.http
      .get(
        `${this.AGENT_URL}/getclient/${id}`,
        {
          headers: { Authorization: `Bearer ${this.token}` },
        }
      )
  }
  updateClient(client: any, clientid: number) {

    return this.http
      .put(
        `${this.AGENT_URL}/updateclient/${clientid}`,
        client,
        {
          headers: { Authorization: `Bearer ${this.token}` },
        }
      )
      .subscribe({
        next:(resp)=>{
          console.log("updated"+resp)
        },
        error:(err)=>{
          console.log("error updating")
        }
      })
  }
}
