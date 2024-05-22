import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators, FormBuilder,ReactiveFormsModule, FormsModule} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
// import { FilterPipePipe } from '../../pipes/filter-pipe.pipe';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(
    private router:Router,
    private formBuilder:FormBuilder,
    private authService:AuthService, 
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      let loginModel = Object.assign({},this.loginForm.value)

      this.authService.login(loginModel).subscribe(response=>{
        localStorage.setItem("token",response.data.token)
        this.router.navigate(['/'])
      },responseError=>{
        //console.log(responseError)
        this.toastrService.error(responseError.error)
      })
    }
  }

}
