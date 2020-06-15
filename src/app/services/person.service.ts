import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private url: string = environment.ip;

  constructor(private http: HttpClient) { }

  checkRandomNumber(randomNumberP): Observable<any> {

    const tempUrl = this.url + `/person/check-random-number?randomNumber=${randomNumberP}`;

    return this.http.get<any>(tempUrl);
  }

  update(randomNumberM, key, code) {

    const tempUrl = this.url + `/person/update?randomNumber=${randomNumberM}&key=${key}`;

    console.log('code >>>>>>>>>>>>>>>>>>>>>>>>>>> ' + code)

    return this.http.put(tempUrl, code);
    
  }
}