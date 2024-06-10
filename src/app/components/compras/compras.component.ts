import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Compra} from '../../models/compra';
import { CompraService } from '../../services/compra.service';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css'
})
export class ComprasComponent {
  compras: Compra[];
  status: number;

  constructor(private compraService: CompraService) {
    this.status = -1;
    this.compras = [];
    
  }
  ngOnInit(): void {
    this.obtenerCompras();
  }

  obtenerCompras(): void {
    this.compraService.obtenerCompras().subscribe(response => {
      if (response && response.data) {
        this.compras = response.data; // Acceso correcto al array de productos
      }
    }, error => {
      console.error('Error fetching compras', error);
    });
  }

}
