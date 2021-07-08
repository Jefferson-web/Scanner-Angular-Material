import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Fase } from 'src/app/Interfaces/Fase';
import { GuiaService } from 'src/app/services/guia.service';

@Component({
  selector: 'progress-tracker',
  templateUrl: './progress-tracker.component.html',
  styleUrls: ['./progress-tracker.component.css']
})
export class ProgressTrackerComponent implements OnInit {

  @Input() fases: Fase[];
  private _item: any;
  detalles: any[];
  @ViewChild('stepper') stepper: MatStepper;
  lastIndex: number;
  constructor(private _guiaService: GuiaService) { }

  ngOnInit(): void {
  }

  @Input('item')
  set item(value: any) {
    if (!value) return;
    this._item = value;
    this.getDetails();
  }

  getDetails() {
    this._guiaService.getDetails(this._item.idproceso).subscribe(detalles => {
      this.detalles = this.fases.map((fase, index) => {
        let valueToReturn;
        if (detalles[index]) {
          let detalleItem: any = detalles[index];
          if (detalleItem["idfase"] == fase.idfase) {
            valueToReturn = { ...detalleItem, completed: true };
            this.lastIndex = index;
          }     
        } else {
          valueToReturn = {
            idfase: fase.idfase,
            fase: fase.descripcion,
            fecharegistro: null,
            completed: false
          }
        }
        return valueToReturn;
      });
      this.selectStep();
    });
  }

  selectStep(){
    let time = 400;
    this.stepper.reset();
    setTimeout(() => {
      for (let index = 0; index < this.lastIndex; index++) {
        this.stepper.next();
      }
    }, time)
  }

  get item() {
    return this._item;
  }

}
