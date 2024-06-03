export class User{
    constructor(public id:number,public nombre:string,public apellido:string,
        public telefono:number,public direccion:string, public cedula:number,
        public role:string,public email:string,public password:string
    ){}
}