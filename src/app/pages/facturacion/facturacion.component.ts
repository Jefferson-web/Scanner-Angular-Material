import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
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
  value: string = "";

  // DataTables Variables
  displayedColumns: string[] = ['position', 'nroGuia', 'fechaInicio', 'acciones'];
  dataSource: MatTableDataSource<Guia>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _guiaService: GuiaService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit(): void {
    this.setFocus();
  }

  getData() {
    this._guiaService.findAll().subscribe(response => {
      this.dataSource = new MatTableDataSource<Guia>(response);
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Guías por página"
    });
  }

  setFocus() {
    setTimeout(() => {
      this.input.focused = true;
      document.getElementById('txtInput')?.focus();
    });
  }

  onInputChange() {
    const value = this.input.value;
    if (this.isValid(value)) {
      const guia: Guia = { NroGuia: value, FechaInicio: new Date() };
      this._guiaService.save(guia).subscribe(response => {
        this.dataSource.data = [...this.dataSource.data, response];
        this.clear();
        this.toastr.success(`Guía ${guia.NroGuia} registrada.`, 'Tecnimotors');
      }, error => {
        alert('Ocuerrio un error en el servidor.');
      });
    } else {
      this.toastr.error(`N° de Guía inválida.`, 'Tecnimotors');
    }
  }

  delete(guia: any) {
    if (window.confirm(`¿Estas seguro de eliminar la guía ${guia.NroGuia}?`)) {
      this._guiaService.delete(guia.id).subscribe(response => {
        this.dataSource.data = this.dataSource.data.filter((objGuia: any) => objGuia.id != guia.id);
      });
    }
  }

  nextIndex() {
    return this.dataSource.data.length + 1;
  }

  isValid(val: string) {
    return /^([0-9]{3}-[0-9]{7})*$/.test(val) && val.length !== 0;
  }

  clear() {
    this.input.value = "";
  }

}
