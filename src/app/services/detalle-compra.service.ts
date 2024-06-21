import { Injectable } from '@angular/core';
import { server } from "./global";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { DetalleCompra } from '../models/detalleCompra';
import { Observable,throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DetalleCompraService {
  private urlAPI:string
  constructor(
      private _http:HttpClient
  ){
      this.urlAPI=server.Url
  }
  crear(detalle: DetalleCompra): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.urlAPI+'detalleCompra', JSON.stringify(detalle), { headers: headers });
  }

}
