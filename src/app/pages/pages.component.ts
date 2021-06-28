import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnDestroy {

  mobileQuery: MediaQueryList;

  fillerNav = [
    { name: 'Pragina Principal', route: 'inicio', icon: 'home' },
    { name: 'Facturación', route: 'facturacion', icon: 'description' },
    { name: 'Reportes', route: 'reportes', icon: 'stacked_bar_chart' }
  ];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, 
              media: MediaMatcher, 
              public _loginService: LoginService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

}
