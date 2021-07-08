import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { ReportesComponent } from './reportes/reportes.component';
import { MaterialModule } from '../material.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HttpClientModule } from '@angular/common/http';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ProgressTrackerComponent } from './progress-tracker/progress-tracker.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    PagesComponent,
    InicioComponent,
    FacturacionComponent,
    ReportesComponent,
    ProgressTrackerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PagesRoutingModule,
    HttpClientModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  exports: [
    PagesComponent,
    InicioComponent,
    FacturacionComponent,
    ReportesComponent
  ]
})
export class PagesModule { }
