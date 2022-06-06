import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  listId:any;
  constructor(private route:ActivatedRoute,private TaskService:TaskService,private router:Router) { }
  
  ngOnInit(): void {
    this.route.params.subscribe((params:any)=>{
      this.listId = params['listId'];
    })
  }
  NewTask(title:string){
    this.TaskService.NewTask(this.listId,title).subscribe((newTask:any)=>{
      this.router.navigate(['../'],{relativeTo:this.route})
    })
  }

}
