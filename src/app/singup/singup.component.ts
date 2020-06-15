import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { defaultFormat as _rollupMoment } from 'moment';
import { UserService } from '../services/user.service';
import { CountryService } from '../services/country.service';
import { BackendResponseCountryDTO, BackendReceiveCountryDTO } from '../EntityDTO/CountryDTO';
import { BackendReceiveUserDTO } from '../EntityDTO/UserDTO';
import { BackendReciveRoleDTO } from '../EntityDTO/RoleDTO';
import { isNullOrUndefined } from 'util';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})

export class SingupComponent implements OnInit {

  // list for menu from backend
  countries: BackendResponseCountryDTO[];

  // variables for storing values
  public fName: string = '';
  public lName: string = '';
  public email: string = '';
  public username: string = '';
  public password: string = '';
  public confirmPassword: string = '';
  public country: BackendResponseCountryDTO;
  public gender: number = null;
  public birthDay: any = new FormControl(moment);
  public phone: string = '';

  // Object From DTO
  public backendReceiveUserDTO: BackendReceiveUserDTO;
  private backendReciveRoleDTO: BackendReciveRoleDTO;
  public passwordHide: boolean = true;
  public rePasswordHide: boolean = true;

  constructor(private theUserService: UserService,
    private theCountryService: CountryService,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    this.backendReceiveUserDTO = new BackendReceiveUserDTO();

    this.theCountryService.findAll().subscribe(
      data => {
        this.countries = data.body
      }
    );
  }

  signup() {

    if (
      this.fNameFormControl.valid &&
      this.lNameFormControl.valid &&
      this.emailFormControl.valid &&
      this.usernameFormControl.valid &&
      this.passwordFormControl.valid &&
      this.countryFormControl.valid && this.countryFormControl.valid &&
      this.genderFormControl.valid && this.phoneFormControl.valid &&
      this.birthDayFormControl.valid
    ) {
      if (this.checkPassword() === true) {
        this.theUserService.save(this.backendReceiveUserDTO).subscribe(
          data => {
            Swal.fire({
              title: 'Success',
              icon: 'success',
              text: 'Saving operation is successfully',
              showCancelButton: false,
              showConfirmButton: false,
              timer: 2200
            });
            this.dialog.closeAll();
          },
          err => {
            Swal.fire({
              title: 'Opps',
              icon: 'error',
              text: err.error,
              showCancelButton: true,
              showConfirmButton: false,
            });
          }
        );
      }
    } else {
      Swal.fire({
        title: 'Information',
        icon: 'warning',
        text: 'Please, Make sure your information is correct',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2200
      });
    }
  }

  checkPassword() {

    if (isNullOrUndefined(this.backendReceiveUserDTO.userPassword) || isNullOrUndefined(this.confirmPassword)) {
      Swal.fire({
        title: 'Password',
        icon: 'info',
        text: 'Please, Make sure password and confirm password is not null and each one eaul another',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2200
      });
      return false;
    } else {

      if (this.backendReceiveUserDTO.userPassword === this.confirmPassword) {
        return true;
      } else {
        Swal.fire({
          title: 'Password',
          icon: 'info',
          text: 'Please, Make sure confirm password equals password',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2200
        });
        return false;
      }
    }
  }




  fNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(7),
  ]);

  lNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(7)
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(20)
  ]);

  rePasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(20),
  ]);

  countryFormControl = new FormControl('', [
    Validators.required,
  ]);

  genderFormControl = new FormControl('', [
    Validators.required,
  ]);

  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.min(1111111111),
    Validators.max(9999999999)
  ]);

  birthDayFormControl = new FormControl('', [
    Validators.required
  ])

  matcher = new MyErrorStateMatcher();

  date = new FormControl(moment);

}


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
