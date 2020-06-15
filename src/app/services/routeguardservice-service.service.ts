import { Injectable } from '@angular/core';
import { HardcodeauthentionserviceServiceService } from './hardcodeauthentionservice-service.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteguardserviceServiceService implements CanActivate {

  constructor(private theHardcodeauthentionserviceService: HardcodeauthentionserviceServiceService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, status: RouterStateSnapshot) {
    if (this.theHardcodeauthentionserviceService.isLogin())
      return true;
    this.router.navigate(['login']);
    return false;
  }
}