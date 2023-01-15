import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guard/auth.guard';
import { AddListComponent } from './pages/add-list/add-list.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { LoginComponent } from './Users/login/login.component';
import { RegisterComponent } from './Users/register/register.component';

const routes: Routes = [
  {path:'',redirectTo:'list',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'list',component:TaskViewComponent,canActivate:[AuthGuard]},
  {path: 'lists/:listId', component: TaskViewComponent,canActivate:[AuthGuard]},
  {path: 'add-list', component: AddListComponent,canActivate:[AuthGuard]},
  {path: 'lists/:listId/add-task', component: AddTaskComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
