import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public identity:any;
  public categories:any
  private checkIdentity;
  constructor(
    
    private userService:UserService,

  ){
     
    this.checkIdentity=setInterval(()=>{
      this.identity=userService.getIdentityFromStorage()
    },500)


  }


  
}
