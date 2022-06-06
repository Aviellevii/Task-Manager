import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate{

  constructor(private auth:AuthService,private router:Router) { }

  
  canActivate(){
    if(this.auth.loggedIn()){
      return true;
    }else{
      alert('please log in')
      this.router.navigate(['/login']);
      return false
    }
  }
}
