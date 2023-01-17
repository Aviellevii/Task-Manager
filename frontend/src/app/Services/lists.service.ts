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
  getList(id:string){
    return this.http.get(`${this.api}/${id}`);
  }
  updateList(id:string,title:string){
    return this.http.patch(`${this.api}/${id}`,{title});
  }
  DeleteList(id:string){
    return this.http.delete(`${this.api}/${id}`)
  }
  GetAllTasks(id:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.api}/${id}/task`);
  }
  AddTask(id:string,title:string){
    return this.http.post(`${this.api}/${id}/task`,{title});
  }
  DeleteTask(id:string,taskId:string){
    return this.http.delete(`${this.api}/${id}/task/${taskId}`);
  }
  getTask(id:string,taskId:string){
    return this.http.get(`${this.api}/${id}/task/${taskId}`);
  }
  UpdateTask(id:string,taskId:string,title:string){
    return this.http.patch(`${this.api}/${id}/task/${taskId}`,{title});
  }
  Complete(task:any){
    return this.http.patch(`${this.api}/${task._listId}/task/${task.id}`,{completed:!task.completed});
  }
}
