import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';
import { UserService } from '../../../services/user.service'; 
import { RouterOutlet, RouterLink,Router } from '@angular/router';
import { server } from '../../../services/global';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { User } from '../../../models/user';


@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent {
  public status: number;
  public fileName:string;
  public url:string;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService,
    private _router: Router
  ) {
    this.status = -1;
    this.fileName="";
    this.url=server.Url

  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(form: any): void {
    this.userService.updateUser(this.data).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status === 200) {
          form.reset();
          this.changeStatus(0);
          this.dialogRef.close(response);
          this._router.navigate(['/users12']); // Mover aquí la navegación
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

      this.userService.uploadImage(formData).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status === 201) {
            this.data.imagen = response.filename;
            this.url = `user/{id}/update-imagen${response.filename}`;
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
  }

  changeStatus(st: number): void {
    this.status = st;
    let countdown = timer(5000);
    countdown.subscribe(() => {
      this.status = -1;
    });
  }
}
