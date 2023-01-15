import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertifyService } from '../Services/alertify.service';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router, private Userservice:UserService,private alertify:AlertifyService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.Userservice.curnnetUser.token) return true;

    this.router.navigateByUrl('/login');
    this.alertify.error('Please Login');
    return false;
  }
  
}
