import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FacebookService } from '../services/facebook.service';
import Swal from 'sweetalert2';
import { PersonService } from '../services/person.service';
import { stringify } from 'querystring';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-sending-message',
  templateUrl: './sending-message.component.html',
  styleUrls: ['./sending-message.component.css']
})
export class SendingMessageComponent implements OnInit {

  message: string;
  key: string;

  constructor(private router: Router,
    private theActivatedRoute: ActivatedRoute,
    private theFacebookService: FacebookService,
    private thePersonService: PersonService,
    private theMessageService: MessageService) {

    let tempKey = localStorage.getItem('key');

    if (tempKey != null && tempKey != undefined && tempKey != "") {
      this.router.navigate(['/message'], {
        queryParams: {
          key: tempKey
        }
      });
    }
  }

  ngOnInit(): void {
  }

  messageFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(500)
  ]);

  matcher = new MyErrorStateMatcher();

  sendMessage() {

    let key = null;

    this.theActivatedRoute.queryParams.subscribe(
      params => {
        key = params['key'];
      }
    );

    if (
      (this.messageFormControl.valid) && (key != null && key != undefined)) {

      let randomNumber = this.generateRandomNumber();
      this.checkIfRandomNumberPIsBeforeOrNot(randomNumber);

      randomNumber = this.generateRandomNumber();
      this.checkIfRandomNumberMIsBeforeOrNot(randomNumber);

      this.key = key;

      localStorage.setItem('key', this.key);

      setTimeout(() => this.getAccessToken(), 1000);


    } else {

      window.open('http://localhost:4200/message?key=' + key, '_self');
    }
  }

  getAccessToken() {

    this.theFacebookService.getAccessToken(this.message, localStorage.getItem('randomNumberM'), this.key).subscribe(
      data => {
        let facebookUrl = data.url;
        facebookUrl = facebookUrl.substring(8, facebookUrl.length);
        // console.log('https://' + facebookUrl);
        window.open('https://' + facebookUrl, '_self');
      },
      err => {
      	console.log('Error >>>>>>>>>>>>> ', err);
        Swal.fire({
          'title': 'Opps',
          'icon': 'error',
          'text': err.error,
          showConfirmButton: true,
          showCancelButton: false
        });
      }
    );
  }

  generateRandomNumber() {

    return Math.floor(Math.random() * 10000) + 563001;
  }

  checkIfRandomNumberPIsBeforeOrNot(randomNumber: number) {

    this.thePersonService.checkRandomNumber(randomNumber).subscribe(

      data => {

        if (data.status) {

          this.checkIfRandomNumberPIsBeforeOrNot(this.generateRandomNumber());

        } else {

          localStorage.setItem('randomNumberP', JSON.stringify(randomNumber));
        }

      },
      err => {
        Swal.fire({
          'title': 'Opps',
          'icon': 'error',
          'text': 'Something went wrong',
          showLoaderOnConfirm: false,
          showCancelButton: false,
          timer: 2000
        });

      });

  }

  checkIfRandomNumberMIsBeforeOrNot(randomNumber: number) {

    this.theMessageService.checkRandomNumber(randomNumber).subscribe(

      data => {

        if (data.status) {

          this.checkIfRandomNumberPIsBeforeOrNot(this.generateRandomNumber());

        } else {

          localStorage.setItem('randomNumberM', JSON.stringify(randomNumber));
        }

      },
      err => {
        Swal.fire({
          'title': 'Opps',
          'icon': 'error',
          'text': 'Something went wrong',
          showLoaderOnConfirm: false,
          showCancelButton: false,
          timer: 2000
        });

      });

  }
}



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
