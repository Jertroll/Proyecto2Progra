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
    return this._http.post(this.urlAPI+'user/login',params,options)

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
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    let options={
        headers
    }
    return this._http.post(this.urlAPI+'user/register',params,options);
}

updateUser(user: User): Observable<any> {
  let userJsonJson = JSON.stringify(user);
  let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  let options = {
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

return this._http.put(`${this.urlAPI}user/${user.id}`, body.toString(), { headers });
}

deliteUser(id: number): Observable<any> {
  return this._http.delete(`${this.urlAPI}user/${id}`);
}

buscarUserPorId(id: number): Observable<User> {
    return this._http.get<{ status: number, message: string, user: User }>('${this.urlAPI}user/${id}')
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

}