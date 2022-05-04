import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgentServicesService {

  constructor(private http: HttpClient) { }

  postAgent(data : any){
    console.log(data)
    return this.http.post("http://localhost:8080/addagent",data);
  }
  getAgents(){
    return this.http.get("http://localhost:8080/getagents");
  }
  putAgent(data:any,id:number){
    return this.http.put("http://localhost:8080/updateagent/"+id,data);
  }
  deleteAgent(id:number){
    return this.http.delete('http://localhost:8080/delete/'+id)
  }
}
