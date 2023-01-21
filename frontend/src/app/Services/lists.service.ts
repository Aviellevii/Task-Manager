import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ListsService {

  private readonly api;
  constructor(private http:HttpClient) { 
    this.api = environment.production? '' : "http://localhost:3000";
  }
  getAllList():Observable<any[]>{
    return this.http.get<any[]>(`${this.api}/api/list`);
  }
  AddList(title:string){
    return this.http.post(`${this.api}/api/list`,{title});
  }
  getList(id:string){
    return this.http.get(`${this.api}/api/list/${id}`);
  }
  updateList(id:string,title:string){
    return this.http.patch(`${this.api}/api/list/${id}`,{title});
  }
  DeleteList(id:string){
    return this.http.delete(`${this.api}/api/list/${id}`)
  }
  GetAllTasks(id:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.api}/api/list/${id}/task`);
  }
  AddTask(id:string,title:string){
    return this.http.post(`${this.api}/api/list/${id}/task`,{title});
  }
  DeleteTask(id:string,taskId:string){
    return this.http.delete(`${this.api}/api/list/${id}/task/${taskId}`);
  }
  getTask(id:string,taskId:string){
    return this.http.get(`${this.api}/api/list/${id}/task/${taskId}`);
  }
  UpdateTask(id:string,taskId:string,title:string){
    return this.http.patch(`${this.api}/api/list/${id}/task/${taskId}`,{title});
  }
  Complete(task:any){
    return this.http.patch(`${this.api}/api/list/${task._listId}/task/${task.id}`,{completed:!task.completed});
  }
}
