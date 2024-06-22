import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { server } from "./global";
import { Bill } from '../models/bill';
import { Observable, throwError } from "rxjs";
import { map,catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BillService {
  private urlAPI:string
  constructor(
      private _http:HttpClient
  ){
      this.urlAPI=server.Url
  }
  obteneracturas(): Observable<{ status: number, message: string, data: Bill[] }> {
    return this._http.get<{ status: number, message: string, data: Bill[] }>(`${this.urlAPI}bill`);
}
mostrarFactura(idFactura: number): Observable<Bill> {
  return this._http.get<{ status: number, message: string, bill: Bill }>(`${this.urlAPI}bill/${idFactura}`)
    .pipe(
      map(response => response.bill), // Extraer el objeto de producto del cuerpo de la respuesta
      catchError(error => {
        console.error('Error al buscar factura por ID:', error);
        return throwError(error); // Propagar el error
      })
    );
}
crear(idCompra: number, fechaEmision: string, nomTienda: string, token: any): Observable<any> {
  // Construye los parámetros para la solicitud POST
  const body = new URLSearchParams();
  body.set('idCompra', idCompra.toString());
  body.set('fechaEmision', fechaEmision);
  body.set('nomTienda', nomTienda);

  // Configura los headers con el token y el tipo de contenido
  const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'bearertoken': token
  });

  // Realiza la solicitud POST
  return this._http.post(`${this.urlAPI}bill`, body.toString(), { headers });
}

}
