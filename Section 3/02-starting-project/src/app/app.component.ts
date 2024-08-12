import { Component, OnInit } from '@angular/core';

import { UserService } from './user/user.service';
import { User } from './user/user.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  users: User[] = [];
  selectedUserId?: string;

  constructor(private userService: UserService) {}
  
  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    })
  }

  get selectedUser() {
    return this.users.find((user) => user.id === this.selectedUserId);
  }

  onSelectUser(id: string) {
    this.selectedUserId = id;
  }

}
