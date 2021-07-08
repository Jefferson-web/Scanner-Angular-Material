import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscriber, Subscription } from 'rxjs';
import { Fase } from 'src/app/Interfaces/Fase';
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
  selectedItem: any;
  fases: Fase[];

  obs1: Subscription;
  obs2: Subscription;

  selectedRow: number = -1;

  ngOnInit(): void {
    this.getData();
    this.getFases();
  }

  getData(){
    this.obs1 = this._guiaService.listDetails().subscribe(data => {
      this.loadDatasource(data);
    });
  }

  getFases(){
    this.obs2 = this._guiaService.listarFases().subscribe(fases => {
      this.fases = fases;
    });
  }

  loadDatasource(data: any){
    this.dataSource = new MatTableDataSource(data);
    setTimeout(() => this.dataSource.paginator = this.paginator, 50);
  }

  onClick(element: any, index:number){
    this.selectedItem = element; 
    this.selectedRow = index;
  }

  ngOnDestroy(): void {
    this.obs1.unsubscribe();
  }

}
