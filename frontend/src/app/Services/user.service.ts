import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AlertifyService } from 'src/app/Services/alertify.service';
import { IUser } from 'src/model/IUser';
import { user } from 'src/model/user.class';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly api;
  private userSubject = new BehaviorSubject<user>(this.getUserFromLocalhost());
  public userObservable:Observable<user>;

  constructor(private http:HttpClient,private alertify:AlertifyService){
    this.api = environment.production? '' : "http://localhost:3000";
    this.userObservable = this.userSubject.asObservable();
  }

  public get curnnetUser():user{
    return this.userSubject.value;
  }

  login(userLogin:IUser):Observable<user>{
    return this.http.post<user>(`${this.api}/api/user/login`,userLogin).pipe(
      tap({
        next:(User)=>{
          this.setUserToLocalstorage(User);
          this.userSubject.next(User);
          this.alertify.success(`Welcome ${User.username}`);
        },error:()=>{
          this.alertify.error('login failed');
        }
      })
    )
  }
  register(userRegister:IUser):Observable<user>{
    return this.http.post<user>(`${this.api}/api/user/register`,userRegister).pipe(
      tap({
        next:(User)=>{
          this.setUserToLocalstorage(User);
          this.userSubject.next(User);
          this.alertify.success(`Welcome ${User.username}`);
        },error:(errorResponse)=>{
          this.alertify.error(`${errorResponse.error}`);
        }
      })
    )
  }
  logout(){
    this.userSubject.next(new user());
    localStorage.removeItem('User');
    window.location.reload();    
  }
  private setUserToLocalstorage(User:user){
    localStorage.setItem('User',JSON.stringify(User));
  }
  private getUserFromLocalhost():user{
    const userJson = localStorage.getItem('User');
    if(userJson) return JSON.parse(userJson) as user;
    return new user();
  }
}
