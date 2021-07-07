import { Injectable } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Guia } from '../Interfaces/Guia';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  get guias(): Guia[] {
    var payload = localStorage.getItem('guias');
    if (payload) {
      return JSON.parse(payload) as Guia[];
    }
    localStorage.setItem('guias', JSON.stringify([]));
    return [] as Guia[];
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

  remove(nroguia: string) {
    let guias = [...this.guias];
    const index = guias.findIndex((guia: Guia) => guia.nroguia == nroguia);
    guias.splice(index, 1);
    localStorage.setItem('guias', JSON.stringify(guias));
  }

  removeAll() {
    localStorage.removeItem('guias');
  }

}
