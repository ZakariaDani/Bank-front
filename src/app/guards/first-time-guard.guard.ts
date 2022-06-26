import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientService } from '../services/client.service';

@Injectable({
  providedIn: 'root'
})
export class FirstTimeGuardGuard implements CanActivate {

  constructor(private clientService: ClientService,
            private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  { 
    let firstTime = localStorage.getItem("firstTime");
    console.log(firstTime);

    if(firstTime == null){
      return this.router.createUrlTree([""]);
    }
    else {

      if( firstTime == "true"){
        return this.router.createUrlTree(["/newPassword"]);
      }
      else{
        return this.router.createUrlTree(["/client-home"]);
      }

    }
  }
  
}
