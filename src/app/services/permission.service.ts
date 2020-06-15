import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BackendResponsePermissionDTO } from '../EntityDTO/PermissionDTO';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  url: string = environment.ip;

  constructor(private http: HttpClient) { }


  getToken() {

    const token = localStorage.getItem('token');
    return token
  }

  generateHeader() {

    var headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Bearer ' + this.getToken());

    var httpOptions = {
      headers: headers,
      observe: 'response' as 'response'
    }

    return httpOptions;
  }
}