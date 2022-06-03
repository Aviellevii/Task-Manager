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
  NewTask(listId:string,title:string){
    return this.webRequest.post(`lists/${listId}/tasks`,{title});
  }
  Complete(task:any){
    return this.webRequest.patch(`lists/${task._listId}/tasks/${task._id}`,{Complete:!task.Complete});
  }

}
