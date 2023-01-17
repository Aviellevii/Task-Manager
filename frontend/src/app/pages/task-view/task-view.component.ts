import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListsService } from 'src/app/Services/lists.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit{
  lists!:any[];
  tasks!:any[];
  listId!:string;
  constructor(private listService:ListsService,private route:ActivatedRoute,private router:Router,private userService:UserService){
    listService.getAllList().subscribe((lists)=>{
      this.lists = lists
    })
    route.params.subscribe((params)=>{
      if(params.listId){
        this.listId = params.listId;
        this.listService.GetAllTasks(params.listId).subscribe((tasks)=>{
          this.tasks = tasks
        })
      }
    })
  }
  ngOnInit(): void {
   
  }
  deleteList(){
    this.listService.DeleteList(this.listId).subscribe(()=>{
      this.lists = this.lists.filter(list=>list.id != this.listId)
      this.router.navigateByUrl('/');
    })
  }
  deleteTask(taskId:string){
    this.listService.DeleteTask(this.listId,taskId).subscribe(()=>{
      this.tasks = this.tasks.filter(task=>task.id !== taskId);
    })
  }
  clicked(task:any){
    this.listService.Complete(task).subscribe(()=>{
      task.completed = !task.completed
      console.log(task.completed)
    })
  }
  logout(){
    this.userService.logout();
  }

}
