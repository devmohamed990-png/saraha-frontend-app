import { Component, OnInit } from '@angular/core';

import * as _moment from 'moment';
import { defaultFormat as _rollupMoment } from 'moment';

import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, ErrorStateMatcher } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { BackendResponseUserDTO, BackendReceiveUserDTO } from 'src/app/EntityDTO/UserDTO';
import Swal from 'sweetalert2';
import { BackendResponseCountryDTO, BackendReceiveCountryDTO } from 'src/app/EntityDTO/CountryDTO';
import { CountryService } from 'src/app/services/country.service';
import { isNullOrUndefined } from 'util';

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

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class SettingComponent implements OnInit {

  public passwordHide: boolean = true;
  public rePasswordHide: boolean = true;
  public backendResponseUserDTO: BackendResponseUserDTO = new BackendResponseUserDTO();
  private backendReceiveUserDTO: BackendReceiveUserDTO = new BackendReceiveUserDTO();
  public selected: BackendResponseCountryDTO = new BackendResponseCountryDTO();
  public countries: BackendResponseCountryDTO[];
  public gender: string;
  public password: string;
  public confirmPassword: string;
  public birthDate: any;



  constructor(private theUserService: UserService,
    private theCountryService: CountryService) { }

  ngOnInit(): void {

    this.theUserService.findByUsername(localStorage.getItem('Username')).subscribe(
      data => {

        this.backendResponseUserDTO = new BackendResponseUserDTO();

        this.selected = new BackendResponseCountryDTO();

        this.backendResponseUserDTO = data.body;

        this.selected = this.backendResponseUserDTO.userCountry;

        this.birthDate = this.backendResponseUserDTO.userBirthDay;

        if (this.backendResponseUserDTO.userGeneder === true) {

          this.gender = 'Male';
        } else {

          this.gender = 'Female';
        }

        this.theCountryService.findAllExceptID(this.selected.countryID).subscribe(
          data => {
            this.countries = data.body
          },
          err => {
            Swal.fire({
              title: 'Opps',
              icon: 'error',
              text: err.error.message,
              showCancelButton: false,
              showConfirmButton: false,
              timer: 1700
            })
          });
      },
      err => {
        Swal.fire({
          title: 'Opps',
          icon: 'error',
          text: err.error,
          timer: 1700,
          showCancelButton: false,
          showConfirmButton: false
        });
      });
  }

  save() {

    if (isNullOrUndefined(this.password) && isNullOrUndefined(this.confirmPassword)) {
      this.passwordFormControl.valid
      this.passwordFormControl.valid
    }

    if (
      this.fNameFormControl.invalid ||
      this.lNameFormControl.invalid ||
      this.usernameFormControl.invalid ||
      this.passwordFormControl.invalid ||
      this.rePasswordFormControl.invalid ||
      this.countryFormControl.invalid ||
      this.genderFormControl.invalid ||
      this.phoneFormControl.invalid ||
      this.birthDayFormControl.invalid
    ) {

      Swal.fire({
        title: 'Warning',
        icon: 'warning',
        text: 'Please, Make sure every input is correct',
        showConfirmButton: false,
        showCancelButton: false,
        timer: 1700
      });

    } else {

      if (this.password !== null || this.confirmPassword !== null) {

        if (this.checkPassword() === true) {

          this.backendReceiveUserDTO.userID = this.backendResponseUserDTO.userID;
          this.backendReceiveUserDTO.userFirstName = this.backendResponseUserDTO.userFirstName;
          this.backendReceiveUserDTO.userLastName = this.backendResponseUserDTO.userLastName;
          this.backendReceiveUserDTO.userEmail = this.backendResponseUserDTO.userEmail;
          this.backendReceiveUserDTO.userUsername = this.backendResponseUserDTO.userUsername;
          this.backendReceiveUserDTO.userPassword = this.password;
          this.backendReceiveUserDTO.userCountry = new BackendReceiveCountryDTO();
          this.backendReceiveUserDTO.userCountry.countryID = this.selected.countryID;
          this.backendReceiveUserDTO.userCountry.country = this.selected.country;
          this.backendReceiveUserDTO.userGeneder = this.gender === 'Male' ? true : false;
          this.backendReceiveUserDTO.userPhone = this.backendResponseUserDTO.userPhone;
          if (!isNullOrUndefined(this.birthDate._i)) {
            this.birthDate._i.month = this.birthDate._i.month + 1;
            this.backendReceiveUserDTO.userBirthDay = this.birthDate;
          } else {

            this.backendReceiveUserDTO.userBirthDay = this.birthDate;

          }

          this.theUserService.update(this.backendReceiveUserDTO).subscribe(
            data => {
              Swal.fire({
                title: 'Success',
                text: 'Your informations is updated',
                icon: 'success',
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2200
              });
            },
            err => {
              Swal.fire({
                title: 'Opps',
                text: err.error,
                icon: 'error',
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2200
              });
            }
          );

        } else {
          Swal.fire({
            title: 'Password',
            icon: 'info',
            text: 'Please, Make sure two password are the same',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 1700
          });
        }
      }
    }
  }

  checkPassword() {
    if (this.password === this.confirmPassword) {
      return true;
    } else {
      return false;
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