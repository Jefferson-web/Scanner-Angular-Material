import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _router: Router) { }

  login(id_localidad: number){
    localStorage.setItem('localidad', id_localidad.toString());
  }

  logout(){
    localStorage.removeItem('localidad');
    this._router.navigate(['/login']);
  }

  get localidad(): number {
    return localStorage.getItem('localidad') ? Number(localStorage.getItem('localidad')) : -1;
  }
  
  get isLogged(): boolean{
    return !!localStorage.getItem('localidad');   
  }

}