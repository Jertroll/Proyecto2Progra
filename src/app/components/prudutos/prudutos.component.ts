import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';
import { server } from '../../services/global';
import { ButtonModule } from 'primeng/button';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [FormsModule, CommonModule,MatIconModule, ButtonModule, RouterLink, RouterModule, RouterOutlet],
  templateUrl: './prudutos.component.html',
  styleUrls: ['./prudutos.component.css']
})
export class PrudutosComponent implements OnInit {
  status: number;
  searchTerm: string = '';
  productos: Producto[];
  producto: Producto;
  editando: boolean = false;
  public url:string;

  constructor(private productoService: ProductoService, public dialog: MatDialog) {
    this.status = -1;
    this.productos = [];
    this.producto = new Producto(0, "", 0, "", "", "disponible", "");
    this.url=server.Url
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.obtenerProductos().subscribe(response => {
      if (response && response.data) {
        this.productos = response.data; // Acceso correcto al array de productos
      }
    }, error => {
      console.error('Error fetching productos', error);
    });
  }

  eliminarProducto(producto: Producto): void {
    this.productoService.eliminarProducto(producto.id).subscribe(() => {
      this.productos = this.productos.filter(p => p !== producto);
    });
  }

  actualizarProducto(producto: Producto): void {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '600px',
      data: { ...producto }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productoService.actualizarProducto(result).subscribe({
          next: (response) => {
            console.log(response);
            this.obtenerProductos();
            this.changeStatus(0);
          },
          error: (error: Error) => {
            this.changeStatus(2);
          }
        });
      }
    });
  }

  onSubmit(form: any): void {
    if (this.editando) {
      this.productoService.actualizarProducto(this.producto).subscribe({
        next: (response) => {
          console.log(response);
          this.resetForm();
          this.obtenerProductos();
          this.changeStatus(0);
        },
        error: (error: Error) => {
          this.changeStatus(2);
        }
      });
    }
  }

  search(): void {
    if (this.searchTerm.trim() !== '') {
      this.productoService.buscarProductoPorId(parseInt(this.searchTerm, 10)).subscribe(
        producto => {
          console.log('Producto encontrado:', producto); // Agregar esta línea para depurar
          if (producto) {
            // Producto encontrado, actualizar la lista de productos
            this.productos = [producto];
          } else {
            // Producto no encontrado, vaciar la lista de productos
            this.productos = [];
          }
        },
        error => {
          console.error('Error al buscar producto por ID:', error);
          // Manejo de errores, si es necesario
        }
      );
    } else {
      // Si el término de búsqueda está vacío, mostrar todos los productos
      this.obtenerProductos();
    }
  }
  
  resetForm(): void {
    this.producto = new Producto(0, "", 0, "", "", "disponible", "");
    this.editando = false;
  }

  changeStatus(status: number): void {
    this.status = status;
    setTimeout(() => {
      this.status = -1;
    }, 3000);
  }
}
