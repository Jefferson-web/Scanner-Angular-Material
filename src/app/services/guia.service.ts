import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Guia } from '../Interfaces/Guia';
import { LocalStorageService } from './local-storage.service';
import { LoginService } from './login.service';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class GuiaService extends RestService {

  constructor(private http: HttpClient, private _localStorage: LocalStorageService,
              private _loginService: LoginService) {
    super();
  }

  findAll(idlocalidad: number): Observable<Guia[]> {
    var params = new HttpParams().set('idlocalidad', idlocalidad);
    return this.http.get<Guia[]>(this.url, { params });
  }

  save(guia: Guia): Observable<any> {
    return this.http.post(this.url, guia);
  }

  delete(Id: any): Observable<any> {
    return this.http.delete(this.url + '/' + Id);
  }

  cargar() {
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    var guias = this._localStorage.guias;
    if (guias.length == 0) return;
    return this.http.post(this.url + '/cargar', guias, { headers });
  }

  listDetails(){
    let idlocalidad = this._loginService.localidad;
    return this.http.get(this.url + `/${idlocalidad}/lista_detalles`);
  }

  getDetails(idproceso: number){
    return this.http.get(this.url + `/${idproceso}/detalles`);
  }

  get url() {
    return this.baseURL + '/Guia';
  }

}
