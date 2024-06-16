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
}
