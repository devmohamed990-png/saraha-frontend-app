import { Component, OnInit } from '@angular/core';
import { PersonService } from '../services/person.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-thanking',
  templateUrl: './thanking.component.html',
  styleUrls: ['./thanking.component.css']
})
export class ThankingComponent implements OnInit {

  message: string;
  action: string = 'You can go to Home page by click here.';
  page: string;

  constructor(private theActivatedRoute: ActivatedRoute,
    private router: Router,
    private thePersonService: PersonService) {

    let code = null;

    this.theActivatedRoute.queryParams.subscribe(params => {

      code = params['code'];
    });

    let randomNumber = localStorage.getItem('randomNumberM');
    let key = localStorage.getItem('key');

    if (
      (randomNumber != null && randomNumber != "" && randomNumber != undefined) &&
      (key != null && key != "" && key != undefined) &&
      (code != null && code != "" && code != undefined)) {

      this.thePersonService.update(randomNumber, key, code).subscribe(
        (data: any) => {

          this.message = data.message;
          this.action = data.action;
          this.page = data.page;

          localStorage.removeItem('randomNumberM');
          localStorage.removeItem('randomNumberP');
          localStorage.removeItem('key');
        },
        err => {

          localStorage.removeItem('randomNumberM');
          localStorage.removeItem('randomNumberP');
          localStorage.removeItem('key');

          Swal.fire({
            'title': 'Opps',
            'icon': 'error',
            'text': 'Something went wrong',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 2000
          });
        }
      );

    } else {

      this.message = "This message doesn't send,Please try again.";

      if (key != null && key != undefined && key != "") {

        this.action = 'You can go to back by click here.';
        this.page = '/message';

      } else {

        this.action = 'You can go to Login Page by click here.';
        this.page = '/login';
      }

    }
  }

  ngOnInit(): void {
  }
}