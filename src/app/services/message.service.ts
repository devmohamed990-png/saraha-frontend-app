import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private url: string = environment.ip;

  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {

    return this.http.get<any[]>(this.url + '/message/find-all', this.generateHeader());
  }

  findById(id): Observable<any> {

    const tempUrl = this.url + `/message/find-by-id?id=${id}`;

    return this.http.get<any>(tempUrl, this.generateHeader());
  }

  findByUsername(): Observable<any> {

    const tempUrl = this.url + '/message/find-by-username';

    return this.http.get<any[]>(tempUrl, this.generateHeader());
  }

  delete(message) {

    const tempUrl = this.url + `/message/delete?message=${message}`;

    return this.http.delete(tempUrl, this.generateHeader());
  }

  checkRandomNumber(randomNumber): Observable<any> {

    const tempUrl = this.url + `/message/check-random-number?randomNumber=${randomNumber}`;

    return this.http.get<any>(tempUrl);
  }

  generateHeader() {

    var headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Bearer ' + this.getToken());

    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');

    var httpOptions = {
      headers: headers,
      observe: 'response' as 'response'
    }

    return httpOptions;
  }

  getToken() {

    const token = localStorage.getItem('token');
    return token
  }
}