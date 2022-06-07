import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import {NewListComponent} from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
const routes: Routes = [

  { path: '',redirectTo: 'lists',pathMatch:'full'},
  {path: 'new-list', component: NewListComponent,canActivate:[AuthGaurdService]},
  {path: 'lists', component: TaskViewComponent,canActivate:[AuthGaurdService]},
  {path: 'lists/:listId', component: TaskViewComponent,canActivate:[AuthGaurdService]},
  {path: 'lists/:listId/tasks', component: NewTaskComponent,canActivate:[AuthGaurdService]},
  {path: 'edit-list/:listId', component: EditListComponent,canActivate:[AuthGaurdService]},
  {path: 'edit-task/:listId/tasks/:taskId', component: EditTaskComponent,canActivate:[AuthGaurdService]},

  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginPageComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }