import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Localidad } from '../Interfaces/Localidad';
import { LocalidadService } from '../services/localidad.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  selectedValue: number = -1;
  public localidades: Localidad[] = []; 

  constructor(private _router: Router,
              private _loginService: LoginService,
              private _localidadService: LocalidadService) { }

  ngOnInit(): void {
    this._localidadService.findAll().subscribe(response => {
      this.localidades = response;
    });
  }

  ingresar(){
    this._loginService.login(this.selectedValue);
    this._router.navigate(['/inicio']);
  }

}
