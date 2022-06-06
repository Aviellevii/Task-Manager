import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  username:String;
  password:String;
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  onLoginSubmit(){
    const user ={
      username:this.username,
      password:this.password
    }
    this.auth.login(user).subscribe((data:any)=>{
     if(data){
       this.auth.storeUserData(data.token,data.user['id']);
       this.router.navigate(['/']);
     }else{
       alert('please enter true value or create new acount')
       this.router.navigate(['login'])
     }
    })
  }

}
