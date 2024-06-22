import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { server } from "./global";
import { Compra } from "../models/compra";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private urlAPI:string
  constructor(
      private _http:HttpClient
  ){
      this.urlAPI=server.Url
  }
  obtenerCompras(): Observable<Compra[]> {
    return this._http.get<Compra[]>(`${this.urlAPI}compra`).pipe(
      catchError((error: any) => {
        console.error('Error al obtener compras:', error);
        return throwError(error);
      })
    );
  }

  crear(compra: Compra, token: any): Observable<any> {
    const compraJson = JSON.stringify(compra);
    const params = 'data=' + compraJson;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                      .set('bearertoken', token);
    const options = {
      headers: headers
    };
    return this._http.post(this.urlAPI+'compra', params, options);
  }
}
