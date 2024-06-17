import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { server } from '../../services/global'; 
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CarritoService } from '../../services/carrito';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Carrito } from '../../models/carrito';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [FormsModule, CommonModule,MatCardModule,MatButtonModule,MatInputModule,MatIconModule,MatMenuModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit{
  productos: Producto[] = []; // Lista de productos
  carrito: Producto[] = []; // Lista de productos en el carrito
  productosFiltrados: Producto[] = []; 
  carritoId: number; // ID del carrito
  public url:string;
  buscaNom: string = '';
  status: number;
  private token;

  constructor(private productoService: ProductoService,private carritoService: CarritoService) {
    this.productos = []; 
    this.status = -1;
    //this.producto = new Producto(0, "", 0, "", "", "disponible", "");
    this.url=server.url
    this.carritoId=0;
    this.token=this.userService.getToken();
  }
  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.obtenerProductos().subscribe(response => {
      if (response && response.data) {
        this.productos = response.data; // Acceso correcto al array de productos
        this.productosFiltrados = this.productos; // Inicialmente, mostrar todos los productos
      }
    }, error => {
      console.error('Error fetching productos', error);
    });
  }
  verificarOCrearCarrito(): void {
    const token = this.userService.getToken();
    this.carritoService.verificarOCrearCarrito(token).subscribe(
      response => {
        this.carritoId = response.carrito_id;
        console.log('Carrito verificado o creado:', response);
      },
      error => {
        console.error('Error al verificar o crear carrito:', error);
      }
    );
  }
  buscar(): void {
    if (!this.buscaNom.trim()) {
      // Si no hay término de búsqueda, mostrar todos los productos
      this.productosFiltrados = this.productos;
      return;
    }

    this.productoService.buscarNombre(this.buscaNom).subscribe(
      response => {
        if (response.status === 200) {
          this.productosFiltrados = response.data;
          this.status = 0; // Productos encontrados
        } else {
          this.productosFiltrados = [];
          this.status = 1; // No se encontraron productos
        }
      },
      error => {
        console.error('Error al buscar productos:', error);
        this.productosFiltrados = [];
        this.status = 2; // Error al buscar productos
      }
    );
  }
  agregarAlCarrito(producto: Producto): void {
    if (this.carritoId) {
      this.carritoService.addProductToCart(this.carritoId, producto.id)
        .subscribe(
          response => {
            console.log('Producto agregado al carrito:', response);
            this.carrito.push(producto); // Agrega el producto al array del carrito localmente
          },
          error => {
            console.error('Error al agregar producto al carrito:', error);
          }
        );
    } else {
      console.error('Carrito ID no encontrado.');
    }
  }

}
