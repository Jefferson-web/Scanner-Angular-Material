import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { ReportesComponent } from './reportes/reportes.component';
import { MaterialModule } from '../material.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HttpClientModule } from '@angular/common/http';
import { ProgressTrackerComponent } from './progress-tracker/progress-tracker.component';
import { GraficosComponent } from './graficos/graficos.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    PagesComponent,
    InicioComponent,
    FacturacionComponent,
    ReportesComponent,
    ProgressTrackerComponent,
    GraficosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PagesRoutingModule,
    HttpClientModule,
    NgxChartsModule
  ],
  exports: [
    PagesComponent,
    InicioComponent,
    FacturacionComponent,
    ReportesComponent
  ]
})
export class PagesModule { }
