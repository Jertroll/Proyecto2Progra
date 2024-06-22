import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { server } from '../../../services/global'; 
import { ButtonModule } from 'primeng/button';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service'; 
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-userup',
  standalone: true,
  imports: [
    FormsModule, CommonModule,MatIconModule, ButtonModule, RouterLink, RouterModule, RouterOutlet
  ],
  styleUrls: ['./userup.component.css'],
  templateUrl: './userup.component.html'
})
export class UserupComponent implements OnInit {
  status: number = -1;
  searchTerm: string = '';
  users: User[] = [];
  user: User = new User(0, '', '', 0, '', 0, '', '', '','');
  editando: boolean = false;
  public url:string;
  

  constructor(private userService: UserService, public dialog: MatDialog) {
    this.url=server.Url
  }

  ngOnInit(): void {
    this.obtenerUsers();
  }

  obtenerUsers(): void {
    this.userService.obtenerusers().subscribe(
      (response) => {
        if (response && response.data) {
          this.users = response.data;
        }
      },
      error => {
        console.error('Error fetching users', error);
      }
    );
  }

  eliminarUser(user: User): void {
    this.userService.deliteUser(user.id).subscribe(() => {
      this.users = this.users.filter(p => p !== user);
    });
  }

  actualizarUser(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '600px',
      data: { ...user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(result).subscribe({
          next: () => {
            this.obtenerUsers();
            this.changeStatus(0);
          },
          error: () => {
            this.changeStatus(2);
          }
        });
      }
    });
  }

  search(): void {
    if (this.searchTerm.trim() !== '') {
      this.userService.buscarUserPorId(parseInt(this.searchTerm, 10)).subscribe(
        user => {
          if (user) {
            this.users = [user];
          } else {
            this.users = [];
          }
        },
        error => {
          console.error('Error al buscar Usuario por ID:', error);
        }
      );
    } else {
      this.obtenerUsers();
    }
  }

  changeStatus(status: number): void {
    this.status = status;
    setTimeout(() => {
      this.status = -1;
    }, 3000);
  }

  onSubmit(form: any): void {
    if (this.editando) {
      this.userService.updateUser(this.user).subscribe({
        next: () => {
          this.resetForm();
          this.obtenerUsers();
          this.changeStatus(0);
        },
        error: () => {
          this.changeStatus(2);
        }
      });
    }
  }

  resetForm(): void {
    this.user = new  User(0, '', '', 0, '', 0, '', '', '','');
    this.editando = false;
  }
}

