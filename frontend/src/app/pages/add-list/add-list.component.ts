import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListsService } from 'src/app/Services/lists.service';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})
export class AddListComponent {
  listId!:string;
  listname:string = '';
  edit:boolean = false;
  action:string = "Add";
  constructor(private listService:ListsService,private router:Router,private route:ActivatedRoute){
    route.params.subscribe((param)=>{
      if(param.listId){
        this.listId = param.listId;
        this.edit = true;
        this.action = "Edit"
        listService.getList(param.listId).subscribe((list:any)=>{
          this.listname = list.title;
        })
      }
    })
  }

  newList(title:string){
    if(!this.edit){
      this.listService.AddList(title).subscribe(()=>{
        this.router.navigateByUrl('/');
      })
    }else{
      this.listService.updateList(this.listId,title).subscribe(()=>{
        this.router.navigateByUrl('/');
      })
    }
    
  }
}
