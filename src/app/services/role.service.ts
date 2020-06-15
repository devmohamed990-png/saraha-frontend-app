import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { BackendResponseRoleDTO } from '../EntityDTO/RoleDTO';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  url: string = environment.ip;


  constructor(private http: HttpClient) { }


  findAllExceptID(id: number): Observable<any> {

    const tempUrl = this.url + `/role/findAllExceptID?id=${id}`;

    return this.http.get<BackendResponseRoleDTO[]>(tempUrl, this.generateHeader());
  }


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