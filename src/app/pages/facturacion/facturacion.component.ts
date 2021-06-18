import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { Guia } from 'src/app/Interfaces/Guia';
import { GuiaService } from 'src/app/services/guia.service';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements AfterViewInit, OnInit {

  @ViewChild('input') input: MatInput;
  guias: Guia[] = [];
  value: string = "";
  dataSource = [
    { id: '1', nombre: 'jefferson', apellido: 'Ledesma' },
    { id: '2', nombre: 'nataly', apellido: 'Ledesma' },
    { id: '3', nombre: 'brayan', apellido: 'Ledesma' }
  ]
  displayedColumns: string[] = ['id', 'nombre', 'apellido'];

  constructor(private _guiaService: GuiaService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getGuias();
  }

  ngAfterViewInit(): void {
    this.setFocus();
  }

  setFocus() {
    setTimeout(() => {
      this.input.focused = true;
      document.getElementById('txtInput')?.focus();
    });
  }

  getGuias() {
    this._guiaService.findAll().subscribe(guias => {
      this.guias = guias;
    });
  }

  onInputChange() {
    const value = this.input.value;
    if (this.isValid(value)) {
      const guia: Guia = { NroGuia: value };
      this._guiaService.save(guia).subscribe(response => {
        this.guias.push(response);
        this.clearInput();
        this.toastr.success(`Guía ${guia.NroGuia} registrada.`, 'Tecnimotors');
      }, error => {
        alert('Ocuerrio un error en el servidor.');
      });
    } else {
      this.toastr.error(`N° de Guía inválida.`, 'Tecnimotors');
    }
  }

  delete(guia: Guia) {
    if (window.confirm(`¿Estas seguro de eliminar la guía ${guia.NroGuia}?`)) {
      this._guiaService.delete(guia.IdProceso).subscribe(response => {
        this.guias = this.guias.filter(objGuia => objGuia.IdProceso != guia.IdProceso);
      });
    }
  }

  isValid(val: string) {
    return /^([0-9]{3}-[0-9]{7})*$/.test(val) && val.length !== 0;
  }

  clearInput() {
    this.input.value = "";
  }

}
