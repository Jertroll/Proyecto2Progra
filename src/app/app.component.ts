import { Component,OnDestroy } from '@angular/core';
import { RouterLink, RouterOutlet,Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy{
  public identity:any;
  public categories:any
  private checkIdentity: any;
  constructor(
    
    private _router:Router,
    private userService:UserService,

  ){
 
    this.checkIdentity = setInterval(() => {
      this.identity = this.userService.getIdentityFromStorage();
    }, 500);

  }

  ngOnDestroy() {
    if (this.checkIdentity) {
      clearInterval(this.checkIdentity);
    }
  }

  confirmSignOut() {
    console.log('Confirmación de cierre de sesión');
  
    if (confirm('¿Estás seguro de querer cerrar sesión?')) {
      console.log('Cerrando sesión...');
  
      this.userService.clearSessionData();
      this.identity = null; 
      this._router.navigate(['']); 
    } else {
      console.log('Cancelado');
    }
  }

  
}
