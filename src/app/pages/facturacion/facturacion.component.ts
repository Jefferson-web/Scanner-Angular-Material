import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
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
    private toastr: ToastrService,
    private _snackBar: MatSnackBar) { }

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
      this.paginator._intl.itemsPerPageLabel = "Guías por página";
    }, err => {
      alert('Ocurrio un error en la obtención de los datos.');
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
      const guia: Guia = { nroguia: value, fechainicio: new Date() };
      this._guiaService.save(guia).subscribe(response => {
        this.dataSource.data = [...this.dataSource.data, response];
        this.clear();
        this.toastr.success(`Guía ${guia.nroguia} registrada.`, 'Tecnimotors');
      }, err => {
        this.toastr.error(err.error, 'Cuidado!!!');
        this.clear();
      });
    } else {
      this.toastr.info(`N° de Guía inválida.`, 'Tecnimotors');
    }
  }

  delete(guia: Guia) {
    if (window.confirm(`¿Estas seguro de eliminar la guía ${guia.nroguia}?`)) {
      this._guiaService.delete(guia.idproceso).subscribe(response => {
        this.dataSource.data = this.dataSource.data.filter((objGuia: Guia) => objGuia.idproceso != guia.idproceso);
        this._snackBar.open(`Guía N° ${guia.nroguia} eliminada.`, "Ok", { duration: 2000 })
      }, err => {
        console.log(err);
        this.toastr.error('Ocurrió un error en la eliminación.');
      });
    }
  }
  
  isValid(val: string) {
    return /^([0-9]{3}-[0-9]{7})*$/.test(val) && val.length !== 0;
  }

  clear() {
    this.input.value = "";
  }

}
