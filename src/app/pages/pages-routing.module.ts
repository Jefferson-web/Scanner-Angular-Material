import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { InicioComponent } from './inicio/inicio.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { ReportesComponent } from './reportes/reportes.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'inicio', component: InicioComponent },
            { path: 'facturacion', component: FacturacionComponent },
            { path: 'reportes', component: ReportesComponent },
            { path: '', pathMatch: 'full', redirectTo: '/inicio' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
