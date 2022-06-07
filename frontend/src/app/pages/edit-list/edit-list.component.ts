import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  listId:string;
  constructor(private taskService:TaskService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:any)=>{
      this.listId = params['listId'];
    })
  }

  onEditList(task:string){
    this.taskService.editList(this.listId,task).subscribe(() => {
      this.router.navigate(['lists',this.listId]);
    })
  }

}
