import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navi',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './navi.component.html',
  styleUrl: './navi.component.css'
})
export class NaviComponent {

  constructor(private authService:AuthService,private router:Router,private toastrService:ToastrService){}
  ngOnInit(): void {
    this.isAuthenticated();
  }


  isAuthenticated() {
   return this.authService.isAuthenticated();
  }

  logout(){
    this.authService.logout();
    window.location.reload();
  }
}
