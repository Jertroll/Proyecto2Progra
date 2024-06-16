import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user';


import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
public status: number = -1;
public user:User;
constructor(
  private _userService:UserService,
  private _router:Router,
  private _routes:ActivatedRoute
){

  this.user=new User(1,"","",1,"",1,"","","","")
}


    onSubmit(form:any){
  // console.log("Iniciando sesión")
  // console.log(this.user.email)
  this._userService.login(this.user).subscribe({
    next:(response:any)=>{        
      if(response.status!=401){
        sessionStorage.setItem("token",response);
        this._userService.getIdentityFromAPI().subscribe({
          next:(resp:any)=>{
            console.log(resp);
            sessionStorage.setItem('identity',resp);
            this._router.navigate(['']);
          },
          error:(error:Error)=>{
          }
        })
      }else{
        this.status=0;
      }
      
    },
    error:(err:any)=>{
      this.status=1;
    }
  })
}

}
