import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { ReportesComponent } from './reportes/reportes.component';



@NgModule({
  declarations: [
    InicioComponent,
    FacturacionComponent,
    ReportesComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    InicioComponent,
    FacturacionComponent,
    ReportesComponent
  ]
})
export class PagesModule { }
