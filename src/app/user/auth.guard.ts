import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { CanActivate,CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanLoad {

  constructor(private authService:AuthService,
    private router:Router){}
  canLoad(route: Route): boolean {
    return this.checkLogIn(route.path)
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogIn(state.url);
  }

  checkLogIn(url:string):boolean {
    if(this.authService.isLoggedIn){
      return true;
    }
    this.authService.redirectUrl=url;
    this.router.navigate(['/login']);
    return false;
  }
  
}
