import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Users/login/login.component';
import { RegisterComponent } from './Users/register/register.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorInterceptor } from './interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TaskViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:InterceptorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
