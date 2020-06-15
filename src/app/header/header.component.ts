import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodeauthentionserviceServiceService } from '../services/hardcodeauthentionservice-service.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  url: string;

  constructor(private router: Router,
    public theHardcodeauthentionserviceServiceService: HardcodeauthentionserviceServiceService,
    private permissionsService: NgxPermissionsService,
    private theUserService: UserService) {


  }

ngOnInit(): void {

  // if(this.theHardcodeauthentionserviceServiceService.isLogin() == true) {

  // if (this.router.url.indexOf('login') > -1) {

    this.theUserService.extractToken(localStorage.getItem('token')).subscribe(
      (data: any) => {
        data.body.Authorities.permission.forEach(element => {
          this.permissionsService.addPermission(element.authority);
        });
      },
      err => {
        Swal.fire({
          title: 'Opps',
          icon: 'error',
          text: 'Something went wrong',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2200
        });
      }
    );

  this.theUserService.findByUsername(localStorage.getItem('Username')).subscribe(
    data => {
      this.url = data.body.url
      console.log(this.url)
    },
    err => {
      Swal.fire({
        title: 'Opps',
        icon: 'error',
        text: 'Something went wrong',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2200
      });
    }
  );
//}}
}}