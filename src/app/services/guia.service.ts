import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Guia } from '../Interfaces/Guia';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class GuiaService extends RestService {


  constructor(private http: HttpClient) {
    super();
  }

  findAll(idlocalidad: number): Observable<Guia[]> {
    var params = new HttpParams().set('idlocalidad', idlocalidad);
    console.log(params.toString());
    return this.http.get<Guia[]>(this.url, {params});
  }

  save(guia: Guia): Observable<any> {
    return this.http.post(this.url, guia);
  }

  delete(Id: any): Observable<any> {
    return this.http.delete(this.url + '/' + Id);
  }

  get url() {
    return this.baseURL + '/Guia';
  }

}
