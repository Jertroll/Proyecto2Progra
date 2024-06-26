import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user';
import { timer } from 'rxjs';
import { UserService } from '../../../services/user.service'; 
import { RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule,CommonModule],
  templateUrl: './user-agregar.component.html',
  styleUrl: './user-agregar.component.css'
})
export class UserAgregarComponent {
  public user:User;
  public status:number;
  public fileName:string;
  constructor(
    private UserService:UserService,
    private _router: Router,

  ){
    this.status=-1;
    this.user=new User(0,"","",1,"",1,"","","","")
    this.fileName="";
  }

  onSubmit(form:any){

    this.user.rol='user';
    this.UserService.create(this.user).subscribe({
      next:(response)=>{
        console.log(response);
        if(response.status==201){
          form.reset();            
          this.changeStatus(0);

          setTimeout(() => {
          this._router.navigate(['users12']);
          }, 100); 

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

      this.UserService.uploadImage(formData).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status === 201) {
            this.user.imagen = response.filename;
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