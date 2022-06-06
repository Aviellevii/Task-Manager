import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly Root_URL ;
  headers = new HttpHeaders({
    'Authorization':localStorage.getItem('id_token')
  })
  constructor(private http:HttpClient) { 
    this.Root_URL='http://localhost:3000';
  }

  get(uri:string){
    return this.http.get(`${this.Root_URL}/${uri}`,{headers:this.headers});
  }
  post(uri:string,payload:Object){
    return this.http.post(`${this.Root_URL}/${uri}`,payload,{headers:this.headers});
  }
  patch(uri:string,payload:Object){
    return this.http.patch(`${this.Root_URL}/${uri}`,payload,{headers:this.headers});
  }
  delete(uri:string,payload:Object){
    return this.http.delete(`${this.Root_URL}/${uri}`,{headers:this.headers});
  }

}
