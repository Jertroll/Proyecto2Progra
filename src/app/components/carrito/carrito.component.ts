import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { UserService } from '../../services/user.service'; 
import { server } from '../../services/global'; 
import { Producto } from '../../models/producto';
import { Compra } from '../../models/compra';
import { DetalleCompra } from '../../models/detalleCompra';
import { Bill } from '../../models/bill';
import { Carrito } from '../../models/carrito';
import { ProductoService } from '../../services/producto.service';
import { CompraService } from '../../services/compra.service';
import { DetalleCompraService } from '../../services/detalle-compra.service';
import { BillService } from '../../services/bill.service';

interface ProductoSeleccionable extends Producto {
  seleccionado?: boolean;
  cantidad?: number;
}

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  public status: number = -1;
  public carrito: ProductoSeleccionable[] = [];
  public detalleCompra: DetalleCompra[] = [];
  public url: string;
  private token: string | null = null;
  public compra: Compra = new Compra(0, 0, 0, "", "");
  public bill: Bill = new Bill(0, 0, "", "", 0, 0, 0);
  public mostrarInfoFactura: boolean = false;
  public facturaId: number = 0;

  constructor(
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private userService: UserService,
    private compraService: CompraService,
    private detalleCompraService: DetalleCompraService,
    private billService: BillService
  ) {
    this.url = server.Url;
    this.token = this.userService.getToken();
  }

  ngOnInit(): void {
    this.obtenerProductosCarrito();
  }

  obtenerProductosCarrito(): void {
    if (this.token) {
      this.carritoService.obtenerProductosCarrito(this.token).subscribe(
        response => {
          if (response && response.status === 200) {
            this.carrito = response.data.map((producto: Producto) => ({ ...producto, seleccionado: false }));
          } else {
            console.error('Error al obtener productos del carrito', response.message);
          }
        },
        error => {
          console.error('Error al obtener productos del carrito', error);
        }
      );
    }
  }

  onTourSelectionChange(producto: ProductoSeleccionable, event: any): void {
    producto.seleccionado = event.target.checked;
    if (producto.seleccionado) {
      producto.cantidad = producto.cantidad ?? 1;
      this.detalleCompra.push(new DetalleCompra(0, 0, producto.id, producto.cantidad, producto.precio, producto.precio * producto.cantidad));
    } else {
      this.detalleCompra = this.detalleCompra.filter(det => det.idProducto !== producto.id);
    }
  }

  onSubmit(compraForm: any): void {
    const detallesCompra: DetalleCompra[] = this.carrito
      .filter(producto => producto.seleccionado)
      .map(producto => {
        const cantidad = producto.cantidad ?? 1;
        return new DetalleCompra(
          0,
          0,
          producto.id,
          cantidad,
          producto.precio,
          producto.precio * cantidad
        );
      });

    const fechaActual = new Date().toISOString().split('T')[0];
    const compra = new Compra(0, 0, 0, "Realizada", fechaActual);

    if (this.token) {
      this.compraService.crear(compra, this.token).subscribe(
        (response) => {
          const compraId = response.compra.idCompra;
          this.saveDetallesCompra(compraId, detallesCompra);
          this.createFactura(compraId);
          compraForm.reset();
          this.carrito = [];
          this.status = 0;
          this.obtenerProductosCarrito();
        },
        error => {
          console.error('Error al hacer la compra:', error);
          this.status = 2;
        }
      );
    }
  }

  saveDetallesCompra(compraId: number, detallesCompra: DetalleCompra[]): void {
    detallesCompra.forEach(detalle => {
      detalle.idCompra = compraId;
      this.detalleCompraService.crear(detalle).subscribe({
        next: (response) => {
          console.log('DetalleCompra creado:', response);
        },
        error: (error: Error) => {
          console.error('Error creando detalle de compra:', error);
        }
      });
    });
  }

  eliminarProducto(producto_id: number): void {
    if (this.token) {
      this.carritoService.removeProductFromCart(producto_id, this.token).subscribe(
        response => {
          console.log('Producto eliminado del carrito:', response.message);
          this.obtenerProductosCarrito();
        },
        error => {
          console.error('Error al eliminar producto del carrito:', error);
        }
      );
    }
  }

  createFactura(compraId: number): void {
    const nomTienda = "El Perro CR";
    const fechaEmision = new Date().toISOString().split('T')[0];
    if (this.token) {
      this.billService.crear(compraId, fechaEmision, nomTienda, this.token).subscribe(
        (response) => {
          const facturaId = response.bill.id;
          this.mostrarFactura(facturaId);
        },
        error => {
          console.error('Error creando factura:', error);
        }
      );
    }
  }

  mostrarFactura(facturaId: number): void {
    this.billService.mostrarFactura(facturaId).subscribe(
      (response) => {
        this.bill = response.bill; // Aquí se extrae la factura de la respuesta
        this.mostrarInfoFactura = true;
      },
      (error) => {
        console.error('Error obteniendo factura:', error);
      }
    );
  }
}
