import { Injectable } from '@angular/core';
import { Guia } from '../Interfaces/Guia';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  get guias(): [] {
    var payload = localStorage.getItem('guias');
    if (payload) {
      return JSON.parse(payload);
    }
    localStorage.setItem('guias', JSON.stringify([]));
    return [];
  }

  add(nuevaGuia: Guia) {
    let index = this.guias.findIndex((guia: Guia) => guia.nroguia == nuevaGuia.nroguia);
    if (index == -1) {
      let guias = [...this.guias, nuevaGuia];
      localStorage.setItem('guias', JSON.stringify(guias));
      return true;
    }
    return false;
  }

  remove(index: number) {
    var guias = this.guias.splice(index, 1);
    localStorage.setItem('guias', JSON.stringify(guias));
  }

  removeAll() {
    localStorage.removeItem('guias');
  }

}
