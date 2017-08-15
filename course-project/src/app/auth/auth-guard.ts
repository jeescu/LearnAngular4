import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "app/auth/auth.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.authService.isAuthenticated();
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.authService.isAuthenticated();
  }
}