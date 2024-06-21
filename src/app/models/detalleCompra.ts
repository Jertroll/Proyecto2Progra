export class DetalleCompra {
    constructor(public idDetalle:number,public idCompra:number,public idProducto:number,public cantidad:number,
       public precioUnitario:number,public subTotal:number
   ){}   
}