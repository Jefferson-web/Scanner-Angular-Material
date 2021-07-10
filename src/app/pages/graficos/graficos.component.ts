import { Component, OnInit } from '@angular/core';
import { GuiaService } from 'src/app/services/guia.service';

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

  constructor(private _guiaService: GuiaService) { }

  onSelect(event: any) {
    console.log(event);
  }
  ngOnInit(): void {
    this._guiaService.listarDatosGenerales().subscribe(data => {
      this.single = data;
    });  
  }
}