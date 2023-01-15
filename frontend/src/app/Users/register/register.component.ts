import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!:FormGroup;
  constructor(private fb:FormBuilder,private userService:UserService,private router:Router){

  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required],
    })
  }
  get fc(){
    return this.registerForm.controls;
  }
  register(){
    this.userService.register({username:this.fc.username.value,password:this.fc.password.value})
    .subscribe(()=>{
      this.router.navigateByUrl('/');
    })
  }
}
