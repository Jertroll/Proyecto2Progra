import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { server } from "./global";
import { Producto } from "../models/producto";
import { Carrito } from "../models/carrito";
import { Observable,throwError } from "rxjs";
import { map,catchError } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class CarritoService {
    private urlAPI:string
    constructor(
        private _http:HttpClient
    ){
        this.urlAPI=server.url
    }
    Crear(token: string): Observable<any> {
        return this._http.post<any>(`${this.urlAPI}carrito/store`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    addProductToCart(id: number, productoId: number): Observable<any> {
        const body = {
          producto_id: productoId,
        };
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(`${this.urlAPI}carrito/${id}/addProductToCart`, body, { headers });
      }
 
    
}
