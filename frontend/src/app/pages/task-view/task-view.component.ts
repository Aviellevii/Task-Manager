import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  lists:any[];
  tasks:any[];
  listId:string;
  constructor(private TaskSevice:TaskService,private route:ActivatedRoute,private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:any)=>{
      console.log(params);
      if(params.listId){
        this.listId=params['listId'];
        this.TaskSevice.getTask(params.listId).subscribe((tasks:any[])=>{
          this.tasks = tasks;
        })
      }else{
        this.tasks= undefined;
      }
      
    })
      this.TaskSevice.getList().subscribe((lists:any[])=>{
      this.lists=lists;
      })
  }
  onTaskClicked(task:any){
    this.TaskSevice.Complete(task).subscribe(()=>{
      task.Complete=!task.Complete;
    })
  }
  onListDeleted(){
    this.TaskSevice.DeleteList(this.listId).subscribe((res:any)=>{
      this.router.navigate(['/lists']);
    })
  }
  onTaskDeleted(id:string){
    this.TaskSevice.DeleteTask(this.listId,id).subscribe((res:any)=>{
      this.tasks = this.tasks.filter(val => val._id !== id);
    })
  }

  logOut(){
    this.auth.logout();
    location.reload()
  }

}
