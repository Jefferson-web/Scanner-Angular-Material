import { Component, OnInit } from '@angular/core';
import { GuiaService } from 'src/app/services/guia.service';
import { LocalidadService } from 'src/app/services/localidad.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {


  single: any[];

  view: [number, number] = [600, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Localidad';
  showYAxisLabel = true;
  yAxisLabel = 'Guías';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private _guiaService: GuiaService,
    private _localidadService: LocalidadService) { }

  localidades: any[] = [];

  onSelect(event: any) {
    console.log(event);
  }
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this._localidadService.findAll().pipe(
      switchMap((localidades) => {
        this.localidades = localidades;
        return this._guiaService.listarDatosGenerales();
      })
    )
      .subscribe((data: []) => {
        this.single = this.localidades.map((value, i) => {
          let index = data.findIndex((obj: any) => obj.name === value.nombre);
          if (index >= 0) return data[index];
          else return { name: value.nombre, value: 0 };
        });
      });
  }
}