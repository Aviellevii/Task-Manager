import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private TaskService:TaskService,private router:Router) { }

  ngOnInit(): void {
  }
  NewList(title:string){
    this.TaskService.createList(title).subscribe((list:any) => {
      this.router.navigate([ '/lists', list._id ]);
    })
  }

}
