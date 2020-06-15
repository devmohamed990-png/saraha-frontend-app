import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root'
})
export class HardcodeauthentionserviceServiceService {

  constructor(private router: Router,
    private permissionsService: NgxPermissionsService) { }

  isLogin() {

    let token = localStorage.getItem("token");
    return !(token === null)
  }

  getUserName() {

    return localStorage.getItem("FirstName") + " " + localStorage.getItem('LastName');
  }

  logout() {

    localStorage.clear();
    this.permissionsService.flushPermissions();
    this.router.navigate(['login']);
  }
}