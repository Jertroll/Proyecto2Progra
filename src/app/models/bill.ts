export class Bill {
    constructor(public id:number,public idUsuario:number,public nomTienda:string,
       public fechaEmision:string,public idCompra:number, public subTotal:number,
       public total:number
   ){}   
}