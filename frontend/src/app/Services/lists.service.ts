import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  private readonly api;
  constructor(private http:HttpClient) { 
    this.api = "http://localhost:3000/api/list";
  }
  getAllList():Observable<any[]>{
    return this.http.get<any[]>(`${this.api}`);
  }
  AddList(title:string){
    return this.http.post(`${this.api}`,{title});
  }
  GetAllTasks(id:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.api}/${id}/task`);
  }
  AddTask(id:string,title:string){
    return this.http.post<any[]>(`${this.api}/${id}/task`,{title});
  }
}
