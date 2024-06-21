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
        this.urlAPI=server.Url
    }
    Crear(token: any): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'bearertoken': token
      });
      const options = { headers };
      return this._http.post(this.urlAPI+'carrito/store', {}, options);
    }
    addProductToCart(productoId: number, token: any): Observable<any> {
      const body = { producto_id: productoId };
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'bearertoken': token
      });
    
      return this._http.post(`${this.urlAPI}agregarCarrito`, body, { headers });
    }
    obtenerProductosCarrito(token: any): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'bearertoken': token
      });
  
      return this._http.get<any>(`${this.urlAPI}obtenerProductosCarrito`, { headers });
    }
    eliminarProductosComprados(carritoId: number): Observable<any> {
      return this._http.delete(`${this.urlAPI}carrito/${carritoId}/eliminarProductosComprados`);
    }
    removeProductFromCart(producto_id: number, token: any): Observable<any> {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      return this._http.delete(`${this.urlAPI}carrito/removeProduct/${producto_id}`, { headers });
    }
}
