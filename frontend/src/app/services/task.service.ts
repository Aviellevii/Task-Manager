import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequest:WebRequestService) { }

  createList(title:string){
    return this.webRequest.post('lists',{title})
  }
  getList(){
    return this.webRequest.get('lists')
  }
  getTask(listId:string){
    return this.webRequest.get(`lists/${listId}/tasks`);
  }
}
