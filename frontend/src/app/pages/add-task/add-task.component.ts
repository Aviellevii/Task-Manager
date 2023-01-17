import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ListsService } from 'src/app/Services/lists.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  taskId!:string;
  listId!:string;
  taskname:string = '';
  edit:boolean = false;
  action:string = "Add";
  constructor(private listService:ListsService,private router:Router,private route:ActivatedRoute){
    this.route.params.subscribe((params)=>{
      if(params.listId){
        this.listId = params.listId;
      }
      if(params.taskId){
        this.taskId = params.taskId;
        this.action = "Edit";
        this.edit = true;
        listService.getTask(this.listId,this.taskId).subscribe((task:any)=>{
          this.taskname = task.title
        })
      }
    })
  }

  newTask(title:string){
    if(!this.edit){
      this.listService.AddTask(this.listId,title).subscribe(()=>{
        this.router.navigate(['../'],{relativeTo:this.route})
      })
    }else{
      this.listService.UpdateTask(this.listId,this.taskId,title).subscribe(()=>{
        this.router.navigate(['../../'],{relativeTo:this.route})
      })
    }
  }
}
