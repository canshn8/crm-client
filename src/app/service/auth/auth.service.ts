import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../../models/singleResponseModel';
import { tokenModel } from '../../models/auth/token';
import { Observable } from 'rxjs';
import { LoginModel } from '../../models/auth/loginModel';
import { RegisterModel } from '../../models/auth/registerModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = "https://localhost:44380/api/Auth";


  constructor(private httpClient:HttpClient) { }

  login(login:LoginModel):Observable<SingleResponseModel<tokenModel>> {
    return this.httpClient.post<SingleResponseModel<tokenModel>>(this.apiURL + "/login",login);
  }

  register(register:RegisterModel):Observable<SingleResponseModel<tokenModel>> {
    return this.httpClient.post<SingleResponseModel<tokenModel>>(this.apiURL + "/register",register);
  }
 
  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("expiration")
  }


  isAuthenticated() {
    if(localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
}
