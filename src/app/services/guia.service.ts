import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Guia } from '../Interfaces/Guia';

@Injectable({
  providedIn: 'root'
})
export class GuiaService {

  private baseURL: string = 'https://localhost:44357/api/Guia';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Guia[]> {
    return this.http.get<Guia[]>(this.baseURL);
  }

  save(guia: Guia): Observable<any> {
    console.log(guia);
    return this.http.post(this.baseURL, guia);
  }

  delete(Id: any): Observable<any> {
    return this.http.delete(this.baseURL + '/' + Id);
  }

}
