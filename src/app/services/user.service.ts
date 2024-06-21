
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

login(user:User):Observable<any>{
    let userJson=JSON.stringify(user);
    let params='data='+userJson
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    let options={
        headers
    }
    return this._http.post(this.urlAPI+'login',params,options)

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
    return this._http.get(this.urlAPI+'client/user/getidentity',options);
    
}           

create(user:User):Observable<any>{
    let userJson=JSON.stringify(user);
    let params='data='+userJson;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    let options={
        headers
    }
    return this._http.post(this.urlAPI+'user/register',params,options);
}

buscarUserPorId(id: number): Observable<User> {
    return this._http.get<{ status: number, message: string, user: User }>(`${this.urlAPI}user/${id}`)
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
  getIdentityFromStorage(){
    let identity=sessionStorage.getItem('identity')
    if(identity){
        
        return JSON.parse(identity)
    }
    return null
}
getToken(){
    return sessionStorage.getItem('token')        
}
obtenerusers(): Observable<{ status: number, message: string, data: User[] }> {
    return this._http.get<{ status: number, message: string, data: User[] }>(`${this.urlAPI}user`);
}

}