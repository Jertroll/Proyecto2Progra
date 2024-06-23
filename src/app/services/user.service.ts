
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { server } from "./global";
import { Observable, throwError } from "rxjs";
import { User } from "../models/user";
import { map,catchError } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class UserService{
private urlAPI:string
constructor(
private _http:HttpClient

){
this.urlAPI=server.Url
}

private sessionStorageKey = 'identity';

login(user:User):Observable<any>{

    let userJson=JSON.stringify(user);
    let params='data='+userJson
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    let options={ headers };

    return this._http.post(this.urlAPI+'user/login',params,options);

}

getIdentityFromAPI():Observable<any>{
    let headers;
    let ElPerroCR=sessionStorage.getItem('token');
    if(ElPerroCR){
        headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('ElPerroCR',ElPerroCR);            
    }else{
        headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');            
    }
    let options={
        headers
    }
    return this._http.get(this.urlAPI+'user/getidentity',options);
    
}           

create(user:User):Observable<any>{

    let userJson=JSON.stringify(user);
    let params='data='+userJson;
     let headers;
  let ElPerroCR=sessionStorage.getItem('token');
  if(ElPerroCR){
      headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                              .set('ElPerroCR',ElPerroCR);            
  }else{
      headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');            
  }
  let options={
      headers
  }
    return this._http.post(this.urlAPI+'user',params,options);
}


updateUser(user: User): Observable<any> {
  let headers;
  let ElPerroCR=sessionStorage.getItem('token');
  if(ElPerroCR){
      headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                              .set('ElPerroCR',ElPerroCR);            
  }else{
      headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');            
  }
  let options={
      headers
  }
  const body = new URLSearchParams();

   body.set('nombre', user.nombre);
   body.set('apellido', user.apellido.toString());
   body.set('telefono', user.telefono.toString());
   body.set('direccion', user.direccion);
   body.set('cedula', user.cedula.toString());
   body.set('rol', user.rol);
   body.set('email', user.email);
   body.set('password', user.password);
   body.set('imagen', user.imagen);

return this._http.put(`${this.urlAPI}user/${user.id}`, body.toString(),options );
}

buscarUserPorId(id: number): Observable<User> {
  let headers;
  let ElPerroCR=sessionStorage.getItem('token');
  if(ElPerroCR){
      headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                              .set('ElPerroCR',ElPerroCR);            
  }else{
      headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');            
  }
  let options={
      headers
  }
    return this._http.get<{ status: number, message: string, user: User }>(`${this.urlAPI}user/${id}`,options)
      .pipe(
        map(response => response.user), // Extraer el objeto de producto del cuerpo de la respuesta
        catchError(error => {
          console.error('Error al buscar usuario por ID:', error);
          return throwError(error); // Propagar el error
        })
      );
  }
uploadImage(formData: FormData): Observable<any> {
    return this._http.post<any>(this.urlAPI+'user/upload', formData);
  }

getToken(){
    return sessionStorage.getItem('token')  || '';      
}
obtenerusers(): Observable<{ status: number, message: string, data: User[] }> {
  let headers;
  let ElPerroCR=sessionStorage.getItem('token');
  if(ElPerroCR){
      headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                              .set('ElPerroCR',ElPerroCR);            
  }else{
      headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');            
  }
  let options={
      headers
  }

    return this._http.get<{ status: number, message: string, data: User[] }>(`${this.urlAPI}user`,options);
}


getIdentityFromStorage() {
    let identity = sessionStorage.getItem('identity');
    if (identity) {
      return JSON.parse(identity);
    }
    return null;
  }

deliteUser(id: number): Observable<any> {

  
  let headers;
  let ElPerroCR=sessionStorage.getItem('token');
  if(ElPerroCR){
      headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                              .set('ElPerroCR',ElPerroCR);            
  }else{
      headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');            
  }
  let options={
      headers
  }

    return this._http.delete(`${this.urlAPI}user/${id}`,options);
  }

  clearSessionData() {
    sessionStorage.removeItem(this.sessionStorageKey);
    sessionStorage.removeItem('token');}


  getImage(filename: string): Observable<Blob> {
    return this._http.get(`${this.urlAPI}user/getimage/${filename}`, { responseType: 'blob' })
        .pipe(
            catchError(error => {
                console.error('Error al obtener la imagen:', error);
                return throwError(error); // Propagar el error
            })
        );
}

}