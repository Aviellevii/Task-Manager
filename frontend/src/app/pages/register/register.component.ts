import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username:String;
  password:String;
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  onRegisterSubmit(){
    const user ={
      username:this.username,
      password:this.password
    }
    this.auth.register(user).subscribe(data=>{
      if(data){
        console.log("success");
        this.router.navigate(['/login'])
      }else{
        console.log("error");
        this.router.navigate(['/register'])
      }
    })
  }

}
