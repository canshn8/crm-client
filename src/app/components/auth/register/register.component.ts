import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators, FormBuilder,ReactiveFormsModule, FormsModule} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
// import { FilterPipePipe } from '../../pipes/filter-pipe.pipe';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  constructor(
    private router:Router,
    private formBuilder:FormBuilder,
    private authService:AuthService, 
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      email: ["",Validators.required],
      firstName: ["",Validators.required],
      lastName: ["",Validators.required],
      // username: ["",Validators.required],

      password:["",Validators.required],
    })
  }

  register(){
    if(this.registerForm.valid){
      // if (this.registerForm.value.password === this.registerForm.value.passwordAgain) {
        let loginModel = Object.assign({},this.registerForm.value)
  
        this.authService.register(loginModel).subscribe(response=>{
          this.toastrService.info("Tebrikler Kayıt Oldunuz! Giriş Yaparak Hesabınızı Kontrol Edin")
          localStorage.setItem("token",response.data.token)
          this.router.navigate(['/','login'])
        },responseError=>{
          this.toastrService.error(responseError.error)
        })
        
      // }
      // else{
      //   this.toastrService.error('Parolalar Uyuşmuyor!')
      // }
    }
  }


}
