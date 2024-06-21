import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/producto';
import { timer } from 'rxjs';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute,Route } from '@angular/router';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-produagregar',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterModule, RouterOutlet],
  templateUrl: './produagregar.component.html',
  styleUrl: './produagregar.component.css'
})
export class ProduagregarComponent {
  public status:number;
  public producto:Producto;
  public fileName:string;
  constructor( private _productoService:ProductoService)
  {
    this.status=-1;
    this.producto = new Producto(0,"",0,"","","disponible","");
    this.fileName="";
  }
  onSubmit(form:any){
    console.log(this.producto);
    this._productoService.crear(this.producto).subscribe({
      next:(response)=>{
        console.log(response);
        if(response.status==200){
          form.reset();            
          this.changeStatus(0);
        }else{
          this.changeStatus(1);
        }
      },
      error:(error:Error)=>{
        this.changeStatus(2);
      }
    })
  }
  uploadImage(event:any){
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('file0', file);

      this._productoService.uploadImage(formData).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status === 201) {
            this.producto.imagen = response.filename;
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
  }
  changeStatus(st:number){
    this.status=st;
    let countdown=timer(5000);
    countdown.subscribe(n=>{
      this.status=-1;
    })
  }
}
