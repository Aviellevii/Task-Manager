import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListsService } from 'src/app/Services/lists.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit{
  lists!:any[];
  tasks!:any[];
  listId!:string;
  constructor(private listService:ListsService,private route:ActivatedRoute,private router:Router){
    listService.getAllList().subscribe((lists)=>{
      this.lists = lists
    })
    route.params.subscribe((params)=>{
      if(params.listId){
        this.listService.GetAllTasks(params.listId).subscribe((tasks)=>{
          this.tasks = tasks
        })
      }
    })
  }
  ngOnInit(): void {
   
  }
  AddTask(){
    this.router.navigateByUrl(`lists/${this.listId}/add-task`)
  }

}
