import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { ReportesComponent } from './reportes/reportes.component';
import { MaterialModule } from '../material.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    PagesComponent,
    InicioComponent,
    FacturacionComponent,
    ReportesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PagesRoutingModule
  ],
  exports: [
    PagesComponent,
    InicioComponent,
    FacturacionComponent,
    ReportesComponent
  ]
})
export class PagesModule { }
