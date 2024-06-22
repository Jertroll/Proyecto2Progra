import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { server } from "./global";
import { Compra } from "../models/compra";
import { Observable,throwError } from "rxjs";

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
  obtenerCompras(): Observable<{ status: number, message: string, data:Compra[] }> {
      return this._http.get<{ status: number, message: string, data: Compra[] }>(`${this.urlAPI}compra`);
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
