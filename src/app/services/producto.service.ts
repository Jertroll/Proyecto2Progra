import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { server } from "./global";
import { Producto } from "../models/producto";
import { Observable } from "rxjs";
import { MatDialogModule } from '@angular/material/dialog';
@Injectable({
    providedIn:'root'
})
export class ProductoService {
    private urlAPI:string
    constructor(
        private _http:HttpClient
    ){
        this.urlAPI=server.url
    }
    obtenerProductos(): Observable<{ status: number, message: string, data: Producto[] }> {
        return this._http.get<{ status: number, message: string, data: Producto[] }>(`${this.urlAPI}producto`);
    }
    crear(producto:Producto):Observable<any>{
        let productoJson=JSON.stringify(producto);
        let params='data='+productoJson;
        let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        let options={
            headers
        }
        return this._http.post(this.urlAPI+'producto',params,options);
    }

    actualizarProducto(producto: Producto): Observable<any> {
        let productoJson = JSON.stringify(producto);
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
          headers
        }
        const body = new URLSearchParams();
    
         body.set('nombre', producto.nombre);
         body.set('precio', producto.precio.toString());
         body.set('descripcion', producto.descripcion);
        body.set('talla', producto.talla);
         body.set('estado', producto.estado);
         body.set('imagen', producto.imagen);

     return this._http.put(`${this.urlAPI}producto/${producto.id}`, body.toString(), { headers });
    }

    eliminarProducto(id: number): Observable<any> {
        return this._http.delete(`${this.urlAPI}producto/${id}`);
    }
    
}
