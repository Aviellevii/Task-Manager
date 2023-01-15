import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guard/auth.guard';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { LoginComponent } from './Users/login/login.component';
import { RegisterComponent } from './Users/register/register.component';

const routes: Routes = [
  {path:'',redirectTo:'task',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'task',component:TaskViewComponent,canActivate:[AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
