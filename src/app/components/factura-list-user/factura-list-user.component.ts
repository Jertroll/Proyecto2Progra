
import { Component, OnInit } from '@angular/core';
import { Bill } from '../../models/bill';
import { BillService } from '../../services/bill.service';
import { Compra } from '../../models/compra';
import { CompraService } from '../../services/compra.service';
import { DetalleCompra } from '../../models/detalleCompra';
import { DetalleCompraService } from '../../services/detalle-compra.service';
import { server } from '../../services/global';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-factura-list-user',
  standalone: true,
  imports: [],
  templateUrl: './factura-list-user.component.html',
  styleUrl: './factura-list-user.component.css'
})
export class FacturaListUserComponent implements OnInit{
private token;
constructor(

){
  this.token=this.userService.getToken();

}
  ngOnInit(): void {
    this.getUserBills();
    
  }

  getUserBills(): void {
    const token = this.authService.getToken(); // Asumiendo que tienes un método para obtener el token
    if (token) {
      this.billService.getUserBills(token).subscribe(
        response => {
          if (response.status === 200) {
            this.bills = response.data;
          } else {
            this.errorMessage = response.message;
          }
        },
        error => {
          this.errorMessage = 'Error al obtener las facturas del usuario: ' + (error.error.message || error.message);
        }
      );
    } else {
      this.errorMessage = 'No se encontró el token de autenticación';
    }
  }

}
