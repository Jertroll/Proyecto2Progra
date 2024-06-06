import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/producto';
import { timer } from 'rxjs';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute,Route } from '@angular/router';

@Component({
  selector: 'app-produagregar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './produagregar.component.html',
  styleUrl: './produagregar.component.css'
})
export class ProduagregarComponent {
  public status:number;
  public producto:Producto;
  constructor( private _productoService:ProductoService)
  {
    this.status=-1;
    this.producto = new Producto(0,"",0,"","","disponible","");
  }
  onSubmit(form:any){
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
  changeStatus(st:number){
    this.status=st;
    let countdown=timer(5000);
    countdown.subscribe(n=>{
      this.status=-1;
    })
  }
}
