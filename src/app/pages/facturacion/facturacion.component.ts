import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
  }

  ngAfterViewInit(): void {
    this.setFocus();
  }

  checkStatus() {
    this._internet.createOnline$().subscribe(status => {
      this.isOnline = status;
      if (this.isOnline) {
        if (this._localStorage.guias.length > 0) {
          this.saveLocalData();
        } else {
          this.getData();
        }
      } else {
        this.getDataFromLS();
      }
    });
  }

  saveLocalData() {
    var guias = this._localStorage.guias;
    this._guiaService.cargar(guias).subscribe(response => {
      const cantidad = this._localStorage.guias.length;
      this.notifier.notify('success', `${cantidad} gu??as registradas.`);
      this._localStorage.removeAll();
      this.getData();
    }, (err) => {
      this.notifier.notify('error', err.error.message);
    });
  }

  getData() {
    let idlocalidad = this._loginService.localidad;
    this._guiaService.findAll(idlocalidad).subscribe(response => {
      this.loadDatasource(response);
      console.log(response);
    }, err => {
      alert('Ocurrio un error en la obtenci??n de los datos.');
    });
  }

  getDataFromLS() {
    let guias = this._localStorage.guias;
    this.loadDatasource(guias);
  }

  loadDatasource(data: any) {
    this.dataSource = new MatTableDataSource<Guia>(data);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Gu??as por p??gina";
    }, 100);
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
      let guia: Guia = { nroguia: value, idlocalidad };
      if (!this.isOnline) {
        guia.local = true;
        if (this._localStorage.add(guia)) {
          this.notifier.notify('success', `Gu??a ${guia.nroguia} registrada en local.`);
          this.dataSource.data = [...this.dataSource.data, guia];
          this.clear();
        } else {
          this.notifier.notify('error', 'El N?? de Gu??a ya existe.');
          this.clear();
        }
      } else {
        this._guiaService.save(guia).subscribe(response => {
          this.agregarGuia(response);
          this.clear();
          this.notifier.notify('success', `Gu??a ${guia.nroguia} registrada.`);
        }, err => {
          if (err.status == 400) {
            this.notifier.notify('error', err.error);
            this.clear();
          } else {
            alert('Error en el servidor. Intentelo m??s tarde.');
          }
        });
      }
    } else {
      this.notifier.notify('warning', 'N?? de Gu??a inv??lida');
    }
  }

  agregarGuia(guia: Guia) {
    let data = this.dataSource.data.slice();
    let index = data.findIndex(value => value.nroguia == guia.nroguia);
    if (index >= 0) {
      data[index] = guia;
      this.dataSource.data = data; 
    } else {
      this.dataSource.data = [guia, ...data];
    }
  }

  eliminarGuia(guia: Guia){
    let data = this.dataSource.data.slice();
    data = data.map((value: Guia) => {
      if (value.idproceso == guia.idproceso) {
        value.accion = true;
        return value;
      }
      return value;
    });
    this.dataSource.data = data;
  }

  delete(guia: Guia) {
    if (window.confirm(`??Estas seguro de eliminar la gu??a ${guia.nroguia}?`)) {
      if (this.isOnline) {
        this._guiaService.delete(guia.idproceso).subscribe(response => {
          this.eliminarGuia(guia);
          this._snackBar.open(`Gu??a N?? ${guia.nroguia} Cancelada.`, "Ok", { duration: 2000 })
        }, err => {
          this.notifier.notify('error', 'Ocurri?? un error en la eliminaci??n.');
        });
      } else {
        this._localStorage.remove(guia.nroguia);
        this.getDataFromLS();
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
