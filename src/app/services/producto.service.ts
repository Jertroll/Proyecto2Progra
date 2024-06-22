import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { server } from "./global";
import { Producto } from "../models/producto";
import { Observable, throwError } from "rxjs";
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlAPI: string
  constructor(
    private _http: HttpClient
  ) {
    this.urlAPI = server.Url
  }
  obtenerProductos(): Observable<{
    status: number, message: string, data: Producto[]
  }> {
    let headers;
    let ElPerroCR = sessionStorage.getItem('token');
    if (ElPerroCR) {
      headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set('ElPerroCR', ElPerroCR);
    } else {
      headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    }
    let options = {
      headers
    }
    return this._http.get<{ status: number, message: string, data: Producto[] }>
      (`${this.urlAPI}producto`, options);
  }
  crear(producto: Producto): Observable<any> {



    let productoJson = JSON.stringify(producto);
    let params = 'data=' + productoJson;
    let headers;
    let ElPerroCR = sessionStorage.getItem('token');
    if (ElPerroCR) {
      headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set('ElPerroCR', ElPerroCR);
    } else {
      headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    }
    let options = {
      headers
    }

    return this._http.post(this.urlAPI + 'producto', params, options);
  }

  actualizarProducto(producto: Producto): Observable<any> {

    let headers;
    let ElPerroCR = sessionStorage.getItem('token');
    if (ElPerroCR) {
      headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set('ElPerroCR', ElPerroCR);
    } else {
      headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    }
    let options = {
      headers
    }

    let productoJson = JSON.stringify(producto);

    const body = new URLSearchParams();

    body.set('nombre', producto.nombre);
    body.set('precio', producto.precio.toString());
    body.set('descripcion', producto.descripcion);
    body.set('talla', producto.talla);
    body.set('estado', producto.estado);
    body.set('imagen', producto.imagen);

    return this._http.put(`${this.urlAPI}producto/${producto.id}`, body.toString(), options);
  }

  eliminarProducto(id: number): Observable<any> {
    let headers;
    let ElPerroCR = sessionStorage.getItem('token');
    if (ElPerroCR) {
      headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set('ElPerroCR', ElPerroCR);
    } else {
      headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    }
    let options = {
      headers
    }

    return this._http.delete(`${this.urlAPI}producto/${id}`, options);
  }
  buscarProductoPorId(id: number): Observable<Producto> {
    let headers;
    let ElPerroCR = sessionStorage.getItem('token');
    if (ElPerroCR) {
      headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set('ElPerroCR', ElPerroCR);
    } else {
      headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    }
    let options = {
      headers
    }

    return this._http.get<{ status: number, message: string, producto: Producto }>(`${this.urlAPI}producto/${id}`, options)
      .pipe(
        map(response => response.producto), // Extraer el objeto de producto del cuerpo de la respuesta
        catchError(error => {
          console.error('Error al buscar producto por ID:', error);
          return throwError(error); // Propagar el error
        })
      );
  }
  uploadImage(formData: FormData): Observable<any> {
    return this._http.post<any>(this.urlAPI + 'producto/upload', formData);
  }
  buscarNombre(nombre: string): Observable<any> {
    let headers;
    let ElPerroCR = sessionStorage.getItem('token');
    if (ElPerroCR) {
      headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set('ElPerroCR', ElPerroCR);
    } else {
      headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    }
    let options = {
      headers
    }

    return this._http.get(`${this.urlAPI}producto/buscar/${nombre}`, options);
  }

}
