import { Component } from '@angular/core';
import { RequestsService } from '../requests/requests.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users:any
  constructor(private requests: RequestsService){
    this.requests.getUsers().subscribe(val=>{
      console.log(val);
      this.users = val;
    });
  }
}
