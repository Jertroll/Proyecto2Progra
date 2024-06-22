import { Component,OnDestroy } from '@angular/core';
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
export class AppComponent implements OnDestroy{
  public identity:any;
  public categories:any
  private checkIdentity: any;
  constructor(
    
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


  
}
