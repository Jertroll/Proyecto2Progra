import { Component, OnInit } from '@angular/core';
import { CompraService } from '../../services/compra.service';
import { Compra } from '../../models/compra';
import { server } from '../../services/global';
import { DetalleCompraService } from '../../services/detalle-compra.service';
import { DetalleCompra } from '../../models/detalleCompra';
import { NgFor, NgIf } from '@angular/common';

interface CompraConDetalles extends Compra {
  showDetails: boolean;
  detalles: DetalleCompra[];
}

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  compras: CompraConDetalles[] = [];
  error: string = '';

  constructor(private compraService: CompraService, private detalleCompraService: DetalleCompraService) {}

  ngOnInit(): void {
    this.obtenerCompras();
  }

  obtenerCompras(): void {
    this.compraService.obtenerCompras().subscribe(
      (response: Compra[]) => {
        if (Array.isArray(response)) {
          this.compras = response.map(compra => ({
            ...compra,
            showDetails: false,
            detalles: []
          }));
        } else {
          console.error('La respuesta no es un arreglo:', response);
        }
      },
      (error) => {
        console.error('Error al obtener las compras:', error);
        this.error = 'Error al obtener las compras';
      }
    );
  }

  toggleDetalles(compra: CompraConDetalles): void {
    compra.showDetails = !compra.showDetails;
    if (compra.showDetails && compra.detalles.length === 0) {
      this.detalleCompraService.obtenerDetalles(compra.idCompra).subscribe(
        (response) => {
          if (Array.isArray(response.data)) {
            compra.detalles = response.data;
          } else {
            console.error('La respuesta no contiene un arreglo en la propiedad data:', response);
          }
        },
        (error) => {
          console.error('Error al obtener detalles de la compra:', error);
          this.error = 'Error al obtener detalles de la compra';
        }
      );
    }
  }
}
