import { Component, OnInit } from '@angular/core';
import { BillService } from '../../services/bill.service';
import { Bill } from '../../models/bill';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listado-facturas',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-factura.component.html',
  styleUrls: ['./lista-factura.component.css']
  
})
export class ListadoFacturasComponent implements OnInit {
  bills: Bill[] = [];

  constructor(private billService: BillService) {}

  ngOnInit(): void {
    this.obtenerFacturas();
  }

  obtenerFacturas(): void {
    this.billService.obtenerFacturas().subscribe(response => {
      if (response && response.data) {
        this.bills = response.data; // Acceso correcto al array de productos
      }
    }, error => {
      console.error('Error fetching facturas', error);
    });
  }

}
