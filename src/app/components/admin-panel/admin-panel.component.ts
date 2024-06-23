import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import { NgIf } from '@angular/common';
import { server } from '../../services/global';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    RouterLink,
    FormsModule,
    CardModule,
    ButtonModule,
    NgIf
  ],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  user: User | null = null;
  public url: string;

  constructor(private userService: UserService) {
    this.url = server.Url;
  }

  ngOnInit(): void {
    this.user = this.userService.getIdentityFromStorage();
    if (this.user && this.user.imagen) {

    }
  }

  
}
