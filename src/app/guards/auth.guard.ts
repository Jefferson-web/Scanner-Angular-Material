import { Injectable } from '@angular/core';
import {CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private _loginService: LoginService,
              private _router: Router){}

  canActivate(): boolean {
    if(this._loginService.isLogged){
      return true
    }
    this._router.navigate(['/login']);
    return false;
  }
  
}
