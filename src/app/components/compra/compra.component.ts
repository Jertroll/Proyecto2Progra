import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompraService } from '../../services/compra.service';
import { Compra } from '../../models/compra';
import { server } from '../../services/global';
import { FilterPipe } from '../../filter.pipe';
import { DetalleCompra } from '../../models/detalleCompra';
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
  compra: Compra[] = [];
  public url: string;

  constructor(private compraService: CompraService) {
    this.status = -1;
    this.url = server.Url;
  }

  ngOnInit(): void {
    this.obtenerCompras();
  }

  obtenerCompras(): void {
    this.compraService.obtenerCompras().subscribe(
      response => {
        if (response && response.data) {
          this.compras = response.data.map((compra: Compra) => ({
            ...compra,
            showDetails: false,
            detalles: [] // Asegúrate de inicializar detalles aquí si es necesario
          }));
        }
      },
      error => {
        console.error('Error fetching compras', error);
      }
    );
  }
  

  toggleDetalles(compra: CompraConDetalles): void {
    compra.showDetails = !compra.showDetails;
  }
}
