import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
 
  loginForm!:FormGroup;
  constructor(private fb:FormBuilder,private userService:UserService,private router:Router){

  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required],
    })
  }
  get fc(){
    return this.loginForm.controls;
  }
  login(){
    this.userService.login({username:this.fc.username.value,password:this.fc.password.value})
    .subscribe(()=>{
      this.router.navigateByUrl('/');
    })
  }
  

}
