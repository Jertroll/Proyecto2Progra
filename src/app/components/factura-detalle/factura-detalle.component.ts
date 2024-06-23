import { Component,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-factura-detalle',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule,MatTableModule],
  templateUrl: './factura-detalle.component.html',
  styleUrl: './factura-detalle.component.css'
})
export class FacturaDetalleComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
