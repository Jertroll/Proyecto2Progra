import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { timer } from 'rxjs';
import { ProductoService } from '../../services/producto.service';
import { server } from '../../services/global';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-edit-product-dialog',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent {
  public status: number;
  public fileName:string;
  public url:string;
  constructor(
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _productoService:ProductoService // Inyectar el servicio
  ) {
    this.status = -1;
    this.fileName="";
    this.url=server.Url
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

            setTimeout(() => {
              window.location.reload(); 
            }, 100); 

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
  uploadImage(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('file0', file);

      this._productoService.uploadImage(formData).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status === 201) {
            this.data.imagen = response.filename;
            this.url = `producto/{id}/update-imagen${response.filename}`;
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
  }

  changeStatus(st: number){
    this.status = st;
    let countdown = timer(5000);
    countdown.subscribe(() => {
      this.status = -1;
    });
  }
}
