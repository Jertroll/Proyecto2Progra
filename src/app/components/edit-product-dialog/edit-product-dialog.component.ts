import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { timer } from 'rxjs';
import { ProductoService } from '../../services/producto.service';
@Component({
  selector: 'app-edit-product-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent {
  public status: number;

  constructor(
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _productoService:ProductoService // Inyectar el servicio
  ) {
    this.status = -1;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(form: any){
     this._productoService.actualizarProducto(this.data).subscribe({
        next: (response) => {
          console.log(response);
          if (response.status === 200) {
            form.reset();
            this.changeStatus(0);
            this.dialogRef.close(response);
          } else {
            this.changeStatus(1);
          }
        },
        error: (error: Error) => {
          this.changeStatus(2);
          console.error(error);
        }
      });
  }

  changeStatus(st: number){
    this.status = st;
    let countdown = timer(5000);
    countdown.subscribe(() => {
      this.status = -1;
    });
  }
}
