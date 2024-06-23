import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { server } from './global';
import { Bill } from '../models/bill';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private urlAPI: string;

  constructor(private _http: HttpClient) {
    this.urlAPI = server.Url;
  }

  obtenerFacturas(): Observable<{ status: number, message: string, data: Bill[] }> {
    return this._http.get<{ status: number, message: string, data: Bill[] }>(`${this.urlAPI}bills`);
  }
  mostrarFactura(id: number): Observable<{ status: number, message: string, bill: Bill }> {
    return this._http.get<{ status: number, message: string, bill: Bill }>(`${this.urlAPI}bill/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error al buscar factura por ID:', error);
          return throwError(error);
        })
      );
  }

  crear(idCompra: number, fechaEmision: string, nomTienda: string, token: any): Observable<any> {
    const headers = new HttpHeaders().set('bearertoken', token);
    const body = { idCompra, fechaEmision, nomTienda };
    return this._http.post<any>(this.urlAPI + 'bill', body, { headers });
  }

  getUserBills(): Observable<any> {
    let headers;
    let ElPerroCR = sessionStorage.getItem('token');
    if (ElPerroCR) {
      headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                 .set('ElPerroCR', ElPerroCR);
    } else {
      headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    }
    let options = { headers };
    return this._http.get<any>(`${this.urlAPI}user-bills`, options);
  }
}
