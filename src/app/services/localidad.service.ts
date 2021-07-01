import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Localidad } from '../Interfaces/Localidad';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService extends RestService {

  constructor(private http: HttpClient) {
    super();
  }

  findAll(): Observable<Localidad[]>{
    return this.http.get<Localidad[]>(this.url);
  }

  get url(){
    return this.baseURL + '/Localidad';
  }

}
