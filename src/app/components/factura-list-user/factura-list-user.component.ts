
import { Component, OnInit } from '@angular/core';
import { Bill } from '../../models/bill';
import { BillService } from '../../services/bill.service';
import { Compra } from '../../models/compra';
import { CompraService } from '../../services/compra.service';
import { DetalleCompra } from '../../models/detalleCompra';
import { DetalleCompraService } from '../../services/detalle-compra.service';
import { server } from '../../services/global';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { FacturaDetalleComponent } from '../factura-detalle/factura-detalle.component';
@Component({
  selector: 'app-factura-list-user',
  standalone: true,
  imports: [],
  templateUrl: './factura-list-user.component.html',
  styleUrl: './factura-list-user.component.css'
})
export class FacturaListUserComponent implements OnInit{
public bills: any[]=[];
  constructor(
  private userService: UserService,
  private billService: BillService,
  public dialog: MatDialog

 ){


 }
  ngOnInit(): void {
    this.getUserBills();
    
  }

  getUserBills(): void {
   
    this.billService.getUserBills().subscribe(
      response => {
        if (response.status === 200) {
          console.log(response.data);
          this.bills = response.data;
        } else {
          // this.errorMessage = response.message;
        }
      },
      error => {
        console.error('Error al obtener las facturas del usuario:', error);
        // this.errorMessage = 'Error al obtener las facturas del usuario: ' + (error.error.message || error.message);
      }
    );
    
  }

  
  openDetailsDialog(detalles: any): void {
    this.dialog.open(FacturaDetalleComponent, {
      width: '600px',
      data: { detalles: detalles }
    });
  }

}
