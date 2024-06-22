import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillService } from '../../services/bill.service';
import { Bill } from '../../models/bill';

@Component({
  selector: 'app-listado-facturas',
  templateUrl: './lista-factura.component.html',
  styleUrls: ['./lista-factura.component.css']
})
export class ListadoFacturasComponent implements OnInit {
  facturas: Bill[] = [];

  constructor(private billService: BillService, private router: Router) {}

  ngOnInit(): void {
    this.billService.obtenerFacturas().subscribe(response => {
      if (response.status === 200) {
        this.facturas = response.data;
      } else {
        console.error('Error al obtener las facturas:', response.message);
      }
    }, error => {
      console.error('Error de servidor:', error);
    });
  }
  verDetalle(id: number): void {
    this.router.navigate(['/facturas', id]);
  }
}
