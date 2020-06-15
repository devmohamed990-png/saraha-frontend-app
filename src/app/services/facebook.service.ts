import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  private url: string = environment.ip;

  constructor(private http: HttpClient) { }

  getAccessToken(message, randomNumber, key): Observable<any> {

    var headers = new HttpHeaders();
    headers.append('Content-Type','application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Methods','POST, GET,PUT, OPTIONS, DELETE');
    headers.append('Access-Control-Max-Age','3600');
    headers.append('Access-Control-Allow-Credentials','true');
    headers.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization, apiToken, tenantId');
    headers.append('Accept','*/*');
	
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'response'
    };

    let tempUrl = this.url + `/facebook/facebook-token?randomNumber=${randomNumber}&key=${key}`;

    return this.http.post<any>(tempUrl, message);
  }

  test(): Observable<any> {

    return this.http.get<any>('http://localhost:8080/facebook/facebook-test');
  }
}
