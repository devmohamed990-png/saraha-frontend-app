import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BackendReceiveUserDTO, BackendResponseUserDTO } from '../EntityDTO/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private url: string = environment.ip;

  private CLEINT_APP_ID: string = 'saraha';
  private CLEINT_APP_PASSWORD: string = '123';



  login(username: string, password: string): Observable<any> {

    var basicheader = btoa(this.CLEINT_APP_ID + ':' + this.CLEINT_APP_PASSWORD);

    var headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Basic ' + basicheader);

    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');

    const httpOptions = {
      headers: headers,
      observe: 'response' as 'response'
    };

    var requestBody = 'username=' + username + '&password=' + password + '&grant_type=' + 'password';

    return this.http.post<any>(this.url + '/oauth/token', requestBody, httpOptions);
  }

  extractToken(token): Observable<any> {

    var headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'response'
    };

    var requestBody = 'token=' + token;

    return this.http.post<any>(this.url + '/token/extract-token', requestBody, httpOptions);
  }

  findAll(): Observable<any> {

    return this.http.get<BackendResponseUserDTO[]>(this.url + '/user/find-all', this.generateHeader());
  }

  findAllWithoutUser(id): Observable<any> {

    const tempUrl = this.url + `/user/find-all-without-user?id=${id}`;

    return this.http.get<BackendResponseUserDTO[]>(tempUrl, this.generateHeader());
  }

  findById(id): Observable<any> {

    console.log('ID >>>>>>>>>>>>>> ', id);


    let formData = new FormData();

    formData.append('id', id);

    return this.http.post<BackendResponseUserDTO>(this.url + '/user/find-by-id', formData, this.generateHeader());
  }

  findByUsername(username: string): Observable<any> {

    console.log('ID >>>>>>>>>>>>>> ', username);

    let formData = new FormData;

    formData.append('username', username);

    return this.http.post<BackendResponseUserDTO>(this.url + '/user/find-by-username', formData, this.generateHeader());
  }

  save(backendReceiveUserDTO: BackendReceiveUserDTO): Observable<any> {

    return this.http.post<any>(this.url + '/user/save', backendReceiveUserDTO, this.generateHeader());
  }

  update(backendReceiveUserDTO: BackendReceiveUserDTO): Observable<any> {

    console.log('backendReceiveUserDTO From Service >>>>>>>>>>>>>>>>>>>>>> ', backendReceiveUserDTO)

    return this.http.put(this.url + '/user/update', backendReceiveUserDTO, this.generateHeader());
  }

  delete(id): Observable<any> {

    const tempUrl = this.url + `/user/delete?id=${id}`

    return this.http.delete(tempUrl, this.generateHeader());
  }

  getToken() {

    const token = localStorage.getItem('token');
    return token
  }

  generateHeader() {

    var headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Bearer ' + this.getToken());

    // headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');

    var httpOptions = {
      headers: headers,
      observe: 'response' as 'response'
    }

    return httpOptions;
  }

}