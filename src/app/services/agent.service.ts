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
  public currentmail:any='';
  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) {
    const fetchedToken = localStorage.getItem('act');
    this.currentmail = localStorage.getItem("agentEmail");

    if (fetchedToken) {
      this.token = fetchedToken;
      this.jwtToken$.next(this.token);
    }
  }

  get jwtBackOfficeToken(): Observable<string> {
    return this.jwtToken$.asObservable();
  }
  deleteClient(clientId: number) {
    return this.http.delete(`${this.AGENT_URL}/deleteclient/${clientId}`,{
      headers: {Authorization: `Bearer ${this.token}`},
      responseType: 'text'
    })
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
  getClientsWithoutAgent(): Observable<any> {
    return this.http
      .get(`${this.AGENT_URL}/clientswithoutagent`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
  }
  getCurrentAgent(): Observable<any> {
    return this.http
      .get(`${this.AGENT_URL}/getcurrentinfo`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
  }
  assigneClient(obj: any){
    return this.http
      .post(
        `${this.AGENT_URL}/assigneagent`,obj,
        {
          headers: { Authorization: `Bearer ${this.token}` },
          responseType: 'text'
        },
      )
  }
  toggleFav(id: any){
    console.log(this.token)
    console.log('****************************');
    
    console.log(`${this.AGENT_URL}/toggleFav/${id}`);
    return this.http
      .post(
        `${this.AGENT_URL}/toggleFav/${id}`,{},
        {
          headers: { Authorization: `Bearer ${this.token}` },
          responseType: 'text'
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
