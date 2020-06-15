import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { SingupComponent } from '../singup/singup.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


export interface DialogData {
  animal: string;
  name: string;
}




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // variables for Login
  public username: string = '';
  public password: string = '';
  public usernameChecker: boolean = true;
  public passwordChecker: boolean = true;


  // variables for sign up

  animal: string;
  name: string;

  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public singupUsername: string = '';
  public singupPassword: string = '';
  public confirmPassword: string = '';
  public country: string = '';
  public gender: string = '';

  constructor(private theUserService: UserService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {

  }

  changeInInput($event) {

    let target: any = event.currentTarget;

    if (target.name === 'username') {

      if (this.username !== '') {

        this.usernameChecker = true;

      } else {

        this.usernameChecker = false;
      }

    } else {

      if (this.password !== '') {

        this.passwordChecker = true;

      } else {

        this.passwordChecker = false;
      }
    }
  }

  login() {

    if (this.username === '') {

      Swal.fire({
        title: 'Login Operation',
        text: 'Please, Enter your username',
        icon: 'error',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1000

      });

    } else if (this.password === '') {

      Swal.fire({
        title: 'Login Operation',
        text: 'Please, Enter your password',
        icon: 'error',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500

      });

    } else {

      this.theUserService.login(this.username, this.password).subscribe(

        data => {

          const token = data.body.access_token;

          localStorage.setItem('token', token);

          this.theUserService.extractToken(token).subscribe(
            data => {

              localStorage.setItem('FirstName', data.body.FirstName);
              localStorage.setItem('LastName', data.body.LastName);
              localStorage.setItem('Phone', data.body.Phone);
              localStorage.setItem('BirthDay', data.body.BirthDay);
              localStorage.setItem('Email', data.body.Email);
              localStorage.setItem('Username', data.body.Username);

              this.router.navigate(['main']);
            }
          );
        },
        err => {

          Swal.fire({
            title: 'Login Operation',
            text: 'Username or Password is incorrect',
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 1500

          });
        }
      );
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SingupComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

  signup() {

  }

}