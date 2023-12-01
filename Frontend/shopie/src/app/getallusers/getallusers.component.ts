import { Component } from '@angular/core';
import { getallusers } from '../interface/register';
import { RegisterService } from '../service/user/register.service';

@Component({
  selector: 'app-getallusers',
  templateUrl: './getallusers.component.html',
  styleUrls: ['./getallusers.component.css'],
})
export class GetallusersComponent {
  allUsers: getallusers[] = [];
  searchtext = '';

  constructor(private registerservice: RegisterService) {}

  ngOnInit() {
    this.getAllUserDetails();
    //this.deleteUser(userID);
  }
  getAllUserDetails() {
    let res = this.registerservice
      .fetchAllUsers()
      ?.subscribe((response: any) => {
        // console.log(response);
        this.allUsers = response.users;
        //console.log(this.allUsers);
      });
  }

  deleteUser(userID: string) {
    this.registerservice.deleteuser(userID).subscribe(
      (response: any) => {
        //console.log(response);
        this.getAllUserDetails();
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }
}
