import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements AfterViewInit {

  @ViewChild('input') input: MatInput;

  displayedColumns: string[] = ['index', 'nroguia', 'fecha'];
  dataSource = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.setFocus();
  }

  setFocus() {
    setTimeout(() => {
      this.input.focused = true;
      document.getElementById('txtInput')?.focus();
    });
  }

}
