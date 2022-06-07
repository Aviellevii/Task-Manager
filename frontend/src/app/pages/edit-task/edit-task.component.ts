import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  constructor(private route:ActivatedRoute,private router:Router,private taskService:TaskService) { }
  listId:string;
  taskId:string;
  ngOnInit(): void {
    this.route.params.subscribe((params:any) => {
      this.listId = params['listId'];
      this.taskId = params['taskId'];
    })
  }
  onEditTask(title:string){
    this.taskService.UpdateTask(this.listId,this.taskId,title).subscribe(()=>{
      alert('Updated');
      this.router.navigate(['/lists',this.listId]);
    })
  }



}
