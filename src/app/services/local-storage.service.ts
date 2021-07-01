import { Injectable } from '@angular/core';
import { Guia } from '../Interfaces/Guia';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService{

  constructor() {
  }

  get guias(): [] {
    var payload = localStorage.getItem('guias');
    if(payload){
      return JSON.parse(payload);
    }
    localStorage.setItem('guias', JSON.stringify([]));
    return [];
  }
  
  add(value: Guia){
    var guias = [...this.guias, value];
    localStorage.setItem('guias', JSON.stringify(guias));
  }

  remove(index: number){
    var guias = this.guias.splice(index, 1);
    localStorage.setItem('guias', JSON.stringify(guias));
  }
  
}
