import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  baseURL: string = 'https://localhost:44357/api';

  constructor() { }
}
