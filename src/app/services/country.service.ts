import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BackendResponseCountryDTO } from '../EntityDTO/CountryDTO';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private url: string = environment.ip;

  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {

    return this.http.get<any[]>(this.url + '/country/findAll', this.generateHeader());
  }

  findAllExceptID(id: number): Observable<any> {

    const tempUrl = this.url + `/country/findAllExceptID?id=${id}`;

    return this.http.get<BackendResponseCountryDTO[]>(tempUrl, this.generateHeader());
  }

  getToken() {

    const token = localStorage.getItem('token');
    return token
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

}
