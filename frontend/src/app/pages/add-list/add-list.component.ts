import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListsService } from 'src/app/Services/lists.service';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})
export class AddListComponent {
  constructor(private listService:ListsService,private router:Router){
  }

  newList(title:string){
    this.listService.AddList(title).subscribe(()=>{
      this.router.navigateByUrl('/');
    })
  }
}
