import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  selectedValue: number = -1;

  constructor(private _router: Router,
              private _loginService: LoginService) { }

  ngOnInit(): void {
  }

  ingresar(){
    this._loginService.login(this.selectedValue);
    this._router.navigate(['/inicio']);
  }

}
