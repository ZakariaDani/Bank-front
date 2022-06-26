import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { SigninService } from '../services/signin.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private signinService: SigninService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.signinService.jwtUserToken.pipe(
      map((result) => !!result),
      tap((result) => {

        const userRole = this.signinService.getRole();
        
        if (!result || (route.data['role'] && route.data['role'].indexOf(userRole) === -1)) {
          this.router.navigateByUrl('/').then();
          return result;
        }
        return result;
      })
    );
  }
}
