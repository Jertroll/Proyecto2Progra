import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Carrito } from '../../models/carrito';
import { UserService } from '../../services/user.service'; 
import { server } from '../../services/global'; 
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { Compra } from '../../models/compra';
import { CompraService } from '../../services/compra.service';
import { DetalleCompra } from '../../models/detalleCompra';
import { DetalleCompraService } from '../../services/detalle-compra.service';
import { Bill } from '../../models/bill';
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
  private token;
  public compra:Compra = new Compra(0,0,0,"","",);
  public bill:Bill=new Bill(0,0,"","",0,0,0);
  public mostrarInfoFactura: boolean = false;
  public facturaId: number=0 ;
  constructor(
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private userService: UserService,
    private compraService: CompraService,
    private detalleCompraService: DetalleCompraService,
    private billService:BillService
  ) {
    this.url = server.Url;
    this.token=this.userService.getToken();
  }

  ngOnInit(): void {
    this.obtenerProductosCarrito();
  }

  obtenerProductosCarrito(): void {
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

  onTourSelectionChange(producto: ProductoSeleccionable, event: any): void {
    producto.seleccionado = event.target.checked;
    if (producto.seleccionado) {
      producto.cantidad = producto.cantidad ?? 1; 
      this.detalleCompra.push(new DetalleCompra(0, 0, producto.id, producto.cantidad, 0, 0));
    } else {
      this.detalleCompra = this.detalleCompra.filter(det => det.idProducto !== producto.id);
    }
  }

  onSubmit(compraForm: any): void {
    // Crea la compra con los detalles
    const detallesCompra: DetalleCompra[] = this.carrito
    .filter(producto => producto.seleccionado)
    .map(producto => {
      const cantidad = producto.cantidad ?? 1; // Asegúrate de que la cantidad no sea undefined
      return new DetalleCompra(
        0, // idDetalleCompra (dejar en 0 si es autoincremental)
        0, // idCompra (se asignará de0,spués)
        producto.id, // idProducto
        cantidad, // cantidad
        producto.precio, // precioUnitario
        producto.precio * cantidad // subTotal
      );
    });
    const fechaActual = new Date().toISOString().split('T')[0];
    console.log('Fecha actual:', fechaActual); // Verifica que la fecha es correcta
    const compra = new Compra(
      0,
      0,
      0,
      "Realizada",
      fechaActual
    );

    console.log('Objeto Compra:', compra);
    // Llama al servicio para crear la compra
    this.token = this.userService.getToken();
    this.compraService.crear(compra,this.token).subscribe(
      (response) => {
        console.log('Compra exitosa:', response);
        const compraId = response.compra.idCompra; // Accede al id de la compra creada
        console.log('ID de compra:', compraId);
        this.saveDetallesCompra(compraId, detallesCompra);
        this.carrito = this.carrito.filter(producto => !producto.seleccionado);
        this.createFactura(compraId);
        compraForm.reset();
        this.carrito = [];
        this.status = 0;
        this.eliminarProductosComprados(response.compra.idCarrito);
      },
      error => {
        console.error('Error al hacer la compra:', error);
        this.status = 2;
      }
    );
  }

  saveDetallesCompra(compraId: number, detallesCompra: DetalleCompra[]): void {
    console.log('Datos iniciales', detallesCompra);
    detallesCompra.forEach(detalle => {
      detalle.idCompra = compraId;
      console.log('Enviando detalle', detalle);
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
  eliminarProductosComprados(carritoId: number): void {
    this.carritoService.eliminarProductosComprados(carritoId).subscribe(
      response => {
        console.log('Productos comprados eliminados del carrito:', response.message);
        // Aquí puedes actualizar el estado del componente o mostrar un mensaje de éxito
        this.obtenerProductosCarrito();
      },
      error => {
        console.error('Error al eliminar productos comprados del carrito:', error);
        // Aquí puedes manejar el error según tu lógica
      }
    );
  }
  eliminarProductoDelCarrito(carritoId: number): void {
    this.carritoService.eliminarProductosComprados(carritoId).subscribe(
      response => {
        console.log('Productos comprados eliminados del carrito:', response.message);
        // Aquí puedes actualizar el estado del componente o mostrar un mensaje de éxito
        this.obtenerProductosCarrito();
      },
      error => {
        console.error('Error al eliminar productos comprados del carrito:', error);
        // Aquí puedes manejar el error según tu lógica
      }
    );
  }
  eliminarProducto(producto_id: number): void {
    this.token = this.userService.getToken();
    this.carritoService.removeProductFromCart(producto_id, this.token).subscribe(
      response => {
        console.log('Producto eliminado del carrito:', response.message);
        this.obtenerProductosCarrito(); // Recargar el carrito
      },
      error => {
        console.error('Error al eliminar producto del carrito:', error);
      }
    );
  }
  createFactura(compraId: number) {
    this.token = this.userService.getToken();
    const nomTienda = "El Perro CR";
    const fechaEmision = new Date().toISOString().split('T')[0]
    this.billService.crear(compraId,fechaEmision,nomTienda,this.token).subscribe(
      (response) => {
        console.log('Factura creada:', response);
        const facturaId = response.bill.id; // Asume que la respuesta contiene el ID de la factura
        this.mostrarFactura(facturaId);
      },
      (error) => {
        console.error('Error creando factura:', error);
      }
    );
  }
  mostrarFactura(facturaId: number){
    this.billService.mostrarFactura(facturaId).subscribe(
      (response) => {
        this.bill = response;
        console.log('Factura obtenida:', this.bill);
        this.mostrarInfoFactura = true; 
        // Aquí puedes agregar la lógica para mostrar la factura en la interfaz de usuario
      },
      (error) => {
        console.error('Error obteniendo factura:', error);
      }
    );
  }
}
