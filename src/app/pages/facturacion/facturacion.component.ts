import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'angular-notifier';
import { Guia } from 'src/app/Interfaces/Guia';
import { CheckInternetService } from 'src/app/services/check-internet.service';
import { GuiaService } from 'src/app/services/guia.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements AfterViewInit, OnInit {

  @ViewChild('input') input: MatInput;
  value: string = "";
  isOnline: boolean = true;
  // DataTables Variables
  displayedColumns: string[] = ['position', 'nroGuia', 'fechaInicio', 'estado', 'acciones'];
  dataSource: MatTableDataSource<Guia>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _guiaService: GuiaService,
    private notifier: NotifierService,
    private _snackBar: MatSnackBar,
    private _loginService: LoginService,
    private _internet: CheckInternetService,
    private _localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.checkStatus();
    if (this.isOnline) {
      this.getData();
    } else {
      this.loadDatasource(this._localStorage.guias);
    }
  }

  ngAfterViewInit(): void {
    this.setFocus();
  }

  checkStatus() {
    this._internet.createOnline$().subscribe(status => {
      this.isOnline = status;
      if (this.isOnline) {
        this._guiaService.cargar()?.subscribe(response => {
          this._localStorage.removeAll();
          this.getData();
        });
      } else {
        this.getDataFromLS();
      }
    });
  }

  getData() {
    let idlocalidad = this._loginService.localidad;
    this._guiaService.findAll(idlocalidad).subscribe(response => {
      this.loadDatasource(response);
    }, err => {
      alert('Ocurrio un error en la obtención de los datos.');
    });
  }

  getDataFromLS() {
    let guias = this._localStorage.guias;
    this.loadDatasource(guias);
  }

  loadDatasource(data: any) {
    this.dataSource = new MatTableDataSource<Guia>(data);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Guías por página";
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
      let idlocalidad = this._loginService.localidad;
      let guia: Guia = { nroguia: value, fechainicio: new Date(), idlocalidad };
      if (!this.isOnline) {
        guia.local = true;
        if (this._localStorage.add(guia)) {
          this.notifier.notify('success', `Guía ${guia.nroguia} registrada.`);
          this.dataSource.data = [...this.dataSource.data, guia];
          this.clear();
        } else {
          this.notifier.notify('error', 'El N° de Guía ya existe.');
          this.clear();
        }
      } else {
        this._guiaService.save(guia).subscribe(response => {
          this.dataSource.data = [...this.dataSource.data, response];
          this.clear();
          this.notifier.notify('success', `Guía ${guia.nroguia} registrada.`);
        }, err => {
          this.notifier.notify('error', err.error);
          this.clear();
        });
      }
    } else {
      this.notifier.notify('warning', 'N° de Guía inválida');
    }
  }

  delete(guia: Guia) {
    if (window.confirm(`¿Estas seguro de eliminar la guía ${guia.nroguia}?`)) {
      if (this.isOnline) {
        this._guiaService.delete(guia.idproceso).subscribe(response => {
          this.dataSource.data = this.dataSource.data.filter((objGuia: Guia) => objGuia.idproceso != guia.idproceso);
          this._snackBar.open(`Guía N° ${guia.nroguia} eliminada.`, "Ok", { duration: 2000 })
        }, err => {
          this.notifier.notify('error', 'Ocurrió un error en la eliminación.');
        });
      } else {

      }
    }
  }

  isValid(val: string) {
    return val.length !== 0;
  }

  clear() {
    this.input.value = "";
  }

}
