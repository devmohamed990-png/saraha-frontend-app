import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BackendResponseUserDTO, BackendReceiveUserDTO } from 'src/app/EntityDTO/UserDTO';
import { BackendResponseCountryDTO, BackendReceiveCountryDTO } from 'src/app/EntityDTO/CountryDTO';
import { BackendReciveRoleDTO } from 'src/app/EntityDTO/RoleDTO';
import { UserService } from 'src/app/services/user.service';
import { CountryService } from 'src/app/services/country.service';
import Swal from 'sweetalert2';
import { isNullOrUndefined } from 'util';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as moment from 'moment';
import { BackendResponseRoleDTO } from 'src/app/EntityDTO/RoleDTO';
import { RoleService } from 'src/app/services/role.service';
import { Router } from '@angular/router';

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
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  public passwordHide: boolean = true;
  public rePasswordHide: boolean = true;
  public backendResponseUserDTO: BackendResponseUserDTO = new BackendResponseUserDTO();
  private backendReceiveUserDTO: BackendReceiveUserDTO = new BackendReceiveUserDTO();
  public selectedCountry: BackendResponseCountryDTO = new BackendResponseCountryDTO();
  public countries: BackendResponseCountryDTO[];
  public selectedRole: BackendResponseRoleDTO = new BackendResponseRoleDTO();
  public roles: BackendResponseRoleDTO[];
  public gender: string;
  public birthDate: any;


  constructor(private theUserService: UserService,
    private theCountryService: CountryService,
    private theRoleService: RoleService,
    private router: Router) {

    this.backendResponseUserDTO = new BackendResponseUserDTO();

    this.backendResponseUserDTO.userCountry = new BackendResponseCountryDTO();

    this.backendResponseUserDTO.userRole = new BackendResponseRoleDTO();

    this.selectedCountry = new BackendResponseCountryDTO();

    this.selectedRole = new BackendResponseRoleDTO();

  }

  ngOnInit(): void {

    let username = localStorage.getItem('editUser');
    if (!isNullOrUndefined(username)) {

      this.theUserService.findByUsername(username).subscribe(
        data => {

          this.backendResponseUserDTO = data.body;

          this.selectedCountry = this.backendResponseUserDTO.userCountry;

          this.selectedRole = this.backendResponseUserDTO.userRole;

          this.birthDate = this.backendResponseUserDTO.userBirthDay;

          if (this.backendResponseUserDTO.userGeneder === true) {

            this.gender = 'Male';
          } else {

            this.gender = 'Female';
          }

          this.theCountryService.findAllExceptID(this.selectedCountry.countryID).subscribe(
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

          this.theRoleService.findAllExceptID(this.selectedRole.roleID).subscribe(
            data => {
              this.roles = data.body
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

      localStorage.removeItem('editUser');
    } else {

      this.router.navigate(['main/user']);
    }

  }

  update() {

    if (
      this.fNameFormControl.invalid ||
      this.lNameFormControl.invalid ||
      this.usernameFormControl.invalid ||
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

      this.backendReceiveUserDTO.userID = this.backendResponseUserDTO.userID;
      this.backendReceiveUserDTO.userFirstName = this.backendResponseUserDTO.userFirstName;
      this.backendReceiveUserDTO.userLastName = this.backendResponseUserDTO.userLastName;
      this.backendReceiveUserDTO.userEmail = this.backendResponseUserDTO.userEmail;
      this.backendReceiveUserDTO.userUsername = this.backendResponseUserDTO.userUsername;
      this.backendReceiveUserDTO.userCountry = new BackendReceiveCountryDTO();
      this.backendReceiveUserDTO.userCountry.countryID = this.selectedCountry.countryID;
      this.backendReceiveUserDTO.userCountry.country = this.selectedCountry.country;
      this.backendReceiveUserDTO.userRole = new BackendReciveRoleDTO();
      this.backendReceiveUserDTO.userRole.roleID = this.selectedRole.roleID;
      this.backendReceiveUserDTO.userRole.role = this.selectedRole.role;
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
            title: 'Saving Operation',
            icon: 'error',
            text: err.error,
            showCancelButton: false,
            showConfirmButton: false,
            timer: 2200
          });
        }
      );
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
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

  countryFormControl = new FormControl('', [
    Validators.required,
  ]);

  roleFormControl = new FormControl('', [
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