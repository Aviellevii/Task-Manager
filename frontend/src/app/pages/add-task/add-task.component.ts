import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ListsService } from 'src/app/Services/lists.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  listId!:string;
  constructor(private listService:ListsService,private router:Router,private route:ActivatedRoute){
    this.route.params.subscribe((params)=>{
      if(params.listId){
        this.listId = params.listId;
      }
    })
  }

  newTask(title:string){
    this.listService.AddTask(this.listId,title).subscribe(()=>{
      this.router.navigate(['../'],{relativeTo:this.route})
    })
  }
}
