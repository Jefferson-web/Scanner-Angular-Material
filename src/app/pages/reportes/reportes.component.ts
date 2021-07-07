import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscriber, Subscription } from 'rxjs';
import { GuiaService } from 'src/app/services/guia.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit, OnDestroy {

  constructor(private _guiaService: GuiaService) { }

  displayedColumns: string[] = ['index', 'guia', 'ultima_fecha', 'fase', 'estado'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  obs1: Subscription;

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.obs1 = this._guiaService.listDetails().subscribe(data => {
      this.loadDatasource(data);
    });
  }

  loadDatasource(data: any){
    this.dataSource = new MatTableDataSource(data);
    setTimeout(() => this.dataSource.paginator = this.paginator, 50);
  }

  onClick(element: any){
    this._guiaService.getDetails(element.idproceso).subscribe(detalles => {
      console.log(detalles);
    });  
  }

  ngOnDestroy(): void {
    this.obs1.unsubscribe();
  }

}
