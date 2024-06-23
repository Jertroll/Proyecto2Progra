import { Component,NgModule, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompraService } from '../../services/compra.service';
import { Compra } from '../../models/compra';
import { server } from '../../services/global';
import { FilterPipe } from '../../filter.pipe';
import { DetalleCompra } from '../../models/detalleCompra';
import { DetalleCompraService } from '../../services/detalle-compra.service';


// Interfaz extendida localmente
interface CompraConDetalles extends Compra {
  showDetails: boolean;
  detalles: DetalleCompra[];
}

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [FormsModule, CommonModule,FilterPipe],
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  status: number;
  searchTerm: string = '';
  compras: CompraConDetalles[] = [];
  public url: string;
  error: string = '';

  constructor(private compraService: CompraService, private detalleCompraService: DetalleCompraService) {
    this.status = -1;
    this.url = server.Url;
  }

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
        (response: any) => {
          console.log(response)
          if (Array.isArray(response.data)) {
            console.log(response.data)
            compra.detalles = response.data;
          } else {
            console.error('La respuesta no contiene un arreglo en la propiedad data:', response);
          }
        },
        (error) => {
          console.error('Error al obtener detalles de la compra', error);
          this.error = 'Error al obtener detalles de la compra';
        }
      );
    }
  }
}
