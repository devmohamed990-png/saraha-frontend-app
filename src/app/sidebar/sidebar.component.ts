import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { HardcodeauthentionserviceServiceService } from '../services/hardcodeauthentionservice-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router,
    private theUserService: UserService,
    public theHardcodeauthentionserviceServiceService: HardcodeauthentionserviceServiceService,
    private permissionsService: NgxPermissionsService) { }

  ngOnInit(): void {

    this.theUserService.extractToken(localStorage.getItem('token')).subscribe(
      (data: any) => {
        data.body.Authorities.permission.forEach(element => {
          this.permissionsService.addPermission(element.authority);
        });
      },
      err => {
      }
    );
  }

  setting() {
    this.router.navigate(['/main/setting']);
  }

}
