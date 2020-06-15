import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { BackendResponseUserDTO } from 'src/app/EntityDTO/UserDTO';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['fName', 'lName', 'email', 'username', 'gender', 'birthDay', 'phone', 'country', 'update', 'delete'];

  public backendResponseUserDTOList: BackendResponseUserDTO[];

  constructor(private theUserService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.findAllWithoutThisUser();
  }

  findAllWithoutThisUser() {
    this.theUserService.findByUsername(localStorage.getItem('Username')).subscribe(
      data => {
        this.theUserService.findAllWithoutUser(data.body.userID).subscribe(
          data => {
            this.backendResponseUserDTOList = data.body;
          },
          err => {
            Swal.fire({
              title: 'Opps',
              icon: 'error',
              text: 'Something went wrong',
              showCancelButton: false,
              showConfirmButton: true
            });
          }
        );
      },
      err => {
        Swal.fire({
          title: 'Opps',
          icon: 'error',
          text: 'Something went wrong',
          showCancelButton: false,
          showConfirmButton: true
        });
      }
    );
  }

  updateUser(username) {

    localStorage.setItem('editUser', username);
    this.router.navigate(['main/edit-user']);
  }

  delete(id: number) {
    this.theUserService.delete(id).subscribe(
      data => {
        this.findAllWithoutThisUser();
        Swal.fire({
          title: 'Success',
          icon: 'success',
          text: 'Deleting operation is Successfully',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2200
        });
      },
      err => {
        Swal.fire({
          title: 'Opps',
          icon: 'error',
          text: 'Something went wrong',
          showCancelButton: false,
          showConfirmButton: true
        });
      }
    );
  }



}