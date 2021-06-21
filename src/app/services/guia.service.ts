import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Guia } from '../Interfaces/Guia';

@Injectable({
  providedIn: 'root'
})
export class GuiaService {

  private baseURL: string = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  private get url() {
    return this.baseURL + '/guias';
  }

  findAll(): Observable<Guia[]> {
    return this.http.get<Guia[]>(this.url);
  }

  save(guia: Guia): Observable<any> {
    return this.http.post(this.url, guia);
  }

  delete(Id: any): Observable<any> {
    return this.http.delete(this.url + '/' + Id);
  }

}
