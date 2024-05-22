import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NaviComponent } from './components/navi/navi.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,NaviComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Crm';


  constructor(private authService:AuthService,private router:Router,private toastrService:ToastrService){}
  ngOnInit(): void {
    this.isAuthenticated();
  }


  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  reload(){
    window.location.reload();
  }

}
