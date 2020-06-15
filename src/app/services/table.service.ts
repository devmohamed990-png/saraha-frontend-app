import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BackendResponseCountryDTO } from '../EntityDTO/CountryDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private url: string = environment.ip;

  constructor(private http: HttpClient) { }
}
