import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [    
    RouterModule, // Añadir esta línea
    RouterOutlet,
    RouterLink,
    FormsModule,
    CardModule,
    ButtonModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {

}
